// import MapComponent from './Map';

import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getLocations, getLocationTypes } from "./actions";
import { ILocation } from "@/models/Location";
import { IType } from "@/models/Type";

export const metadata: Metadata = {
  title: "FruitFindr Map",
};

const LazyMap = dynamic(() => import("@/app/components/map"), {
  ssr: false,
  loading: () => <p>Loading Map...</p>,
});

export default async function Map() {
  const locations: any = await getLocations();
  const types: any = await getLocationTypes();

  return (
        <LazyMap types={types.map(doc => ({
          ...doc,
          _id: doc._id.toString(),
        }))}
        locations={locations.map(doc => ({
          ...doc,
          _id: doc._id.toString(),
          type: { ...doc.type, _id: doc.type._id.toString() }
        }))} />
  );
}


