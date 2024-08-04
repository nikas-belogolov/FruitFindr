import { Metadata } from "next";
import { getActivity } from "../actions"
import {DateTime} from "luxon"
import Link from "next/link";

export const metadata: Metadata = {
    title: "FruitFindr - Activity",
};

export default async function Activity() {

    const activity = await getActivity();

    return (
        <div style={{ padding: "3rem" }}>
            <h1>Activity</h1>
            {
                activity.length != 0 ? activity.map((date, i) => {
                    return (
                        <div key={i}>
                            <h2>{DateTime.fromFormat(date._id, "yyyy-MM-dd").toRelativeCalendar({ unit: "days" })}</h2>
                            <ol>
                            {
                                date.locations.map((location, i) => {
                                    return (
                                        <li key={i}>
                                            <Link href={`/locations/${location._id}`}>{location.type.name}</Link>
                                        </li>
                                    )
                                })
                            }
                            </ol>
                        </div>
                    )
                }) : <p>No recent activity</p>
            }
        </div>
    )
}