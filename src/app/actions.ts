'use server';

import dbConnect from "@/lib/dbConnect";
import Location, { ILocation } from "@/models/Location";
import Type from "@/models/Type";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export async function createLocationType() {

}

export async function createLocation(prevState: any, formData: FormData) {

    await dbConnect();

    const type = formData.get("type");
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");
    const address = formData.get("address");
    const description = formData.get("description");
    const seasonStart = formData.get("season-start");
    const seasonEnd = formData.get("season-end");
    const access = formData.get("access");

    const location = new Location({
        type: type,
        location: {
            coordinates: [
                latitude, longitude
            ]
        },
        description,
        access,
        address,
    });

    if (seasonStart) location.season_start = seasonStart;
    if (seasonEnd) location.season_end = seasonEnd;

    let error = location.validateSync();

    // Errors that are not related to new location type
    if (Object.keys(error.errors).length != 1 || (Object.keys(error.errors).length == 1 && !error.errors['type'])) {
        delete error.errors['type']
        return { errors: Object.keys(error.errors).map((err: string) => error.errors[err].message) }
    }

    const newType = new Type({
        name: type
    });

    await newType.save();

    location.type = newType._id;

    await location.save();

    revalidatePath("/");
    redirect("/");
}

export async function getLocations() {
    await dbConnect();

    return Location.find().populate("type").lean();
}

export async function getLocationById(id) {
    await dbConnect();

    return Location.findById(id).lean()
}

export async function getTypesData() {
    await dbConnect();

    return Type.aggregate([
        {
            $lookup: {
                from: "locations",
                localField: "_id",
                foreignField: "type",
                as: "locations"
            }
        },
        {
            $project: {
                name: "$name",
                wiki: "$wiki",
                scientific_name: "$scientific_name",
                count: { $size: "$locations" }
            }
        }
    ]).exec()
}

export async function getActivity() {
    await dbConnect();

    const currentDate = new Date(Date.now());
    currentDate.setDate(currentDate.getDate() - 3);
    
    // const today = Location.find({ createdAt: { $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) } });
    return Location.aggregate([
        {
            $match: {
                created_at: {
                    $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
                }
            }
        },
        {
            $lookup: {
                from: "types",
                localField: "type",
                foreignField: "_id",
                as: "type",
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            name: 1,
                            scientific_name: 1,
                            wiki: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: {
                path: "$type",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
                locations: {
                    $push: '$$ROOT'
                }
            }
        },
        {
            $sort: {
                _id: -1
            }
        },
        {
            $project: {
              _id: {
                $toString: "$_id"
              },
              locations: "$locations"
            }   
        }
    ])
}

export async function getLocationTypes() {
    await dbConnect();

    return Type.find().lean();
}