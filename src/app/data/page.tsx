import { getTypesData } from "../actions"
import { IType } from "@/models/Type";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "FruitFindr - Data",
};

export default async function Data() {

    const data = await getTypesData();

    return (
        <div style={{ padding: "3rem" }}>
            <h1>Data</h1>
            <p>Data about location types and their occurrences</p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Scientific Name</th>
                        <th>Links</th>
                        <th>Locations</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((type: IType & { count: number }, i) => {
                        return (
                            <tr key={i}>
                                <th>{type.name}</th>
                                <th>{type.scientific_name}</th>
                                <th>{ type.wiki && <Link href={type.wiki as Url}>Wiki</Link> }</th> 
                                <th>{type.count}</th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}