
import { getLocationById, getLocations } from "@/app/actions"
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const Map = dynamic(() => import("@/app/components/map"), {
    ssr: false,
    loading: () => <p>Loading Map...</p>,
  });
  

export default async function Location() {

    // const location = await getLocationById(id)

    const locations: any = await getLocations();

    return (
        <Map
        locations={locations.map(doc => ({
            ...doc,
            _id: doc._id.toString(),
            type: { ...doc.type, _id: doc.type._id.toString() }
        }))} />
    )
}