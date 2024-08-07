'use server'
import { LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { createLocation, getLocationTypes } from "@/app/actions";
import { useFormState } from "react-dom";
import { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "FruitFindr - Add Location",
// };

import Select from "react-select"
import NewLocation from "./NewLocation";




export default async function page() {

    const types = await getLocationTypes();

    return (
        <NewLocation types={types.map(doc => ({
            ...doc,
            _id: doc._id.toString(),
          }))} />
    )
    
}