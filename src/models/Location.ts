import mongoose, { Document, Schema, Types } from "mongoose";
import Type, { IType } from "./Type";

type Month = "January" |"February" | "March" | "April" | "May" | "June" | "July" | "August" | "September" | "October" | "November" | "December"
const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];

export interface ILocation {
  _id: string;
  type: Types.ObjectId & IType;
  location: {
      type: 'Point';
      coordinates: [number, number]; // [longitude, latitude]
  };
  description?: String;
  address?: String;
  access?: "public" | "private" | "overhanging" | "permitted";
  season_start: Month;
  season_end: Month;
}

const isValidGeoJSON = (geojson) => {
    if (!geojson || !geojson.type || !geojson.coordinates) {
      return false;
    }
    const { type, coordinates } = geojson;
    if (type !== 'Point') {
      return false;
    }
    if (!Array.isArray(coordinates) || coordinates.length !== 2) {
      return false;
    }
    const [longitude, latitude] = coordinates;
    if (typeof longitude !== 'number' || typeof latitude !== 'number') {
      return false;
    }
    return longitude >= -180 && longitude <= 180 && latitude >= -90 && latitude <= 90;
};

const LocationSchema: Schema = new mongoose.Schema<ILocation>({
    type: {
        type: Schema.Types.ObjectId,
        ref: "Type",
        required: true,
        validate: (id) => mongoose.isValidObjectId(id) && Type.exists({ _id: id }),
    },

    location: {
        type: {
          type: String,
          default: "Point",
        },
        coordinates: {
          type: [Number],
          required: true,
          validate: {
            validator: function (value) {
              return isValidGeoJSON({ type: 'Point', coordinates: value });
            },
            message: 'Invalid GeoJSON coordinates',
          },
        }
    },
    description: {
        type: String,
        maxLength: 100,
        required: false
    },
    season_start: {
        type: String,
        enum: months,
        required: false
    },
    season_end: {
        type: String,
        enum: months,
        required: false
    },
    address: {
        type: String,
        maxLength: 100,
        required: false
    },
    access: {
        type: String,
        enum: ["public", "private", "overhanging", "permitted"],
        required: false
    },
    
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});



export default mongoose.models.Location ||  mongoose.model('Location', LocationSchema);
