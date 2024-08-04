'use client';
import "leaflet/dist/leaflet.css";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Circle, CircleMarker, MarkerProps } from "react-leaflet";

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

import { FullscreenControl, LocateControl } from "./Controls";
import { MyLocationMarker, NewLocationMarker, LocationMarker } from "./Markers";
import { Icon, LatLngTuple, Map } from "leaflet";
import { ILocation } from "@/models/Location";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useParams } from "next/navigation";
import TypesFilterOverlay from "./TypesFilterOverlay";
import { IType } from "@/models/Type";
// import { Marker } from "leaflet";

// TODO: add types dropdown menu, filtering, separate into different files.

interface IMapComponentProps {
    newLocationPosition?: LatLngTuple;
    setNewLocationPosition?: Function;
    locations?: ILocation[];
    types?: IType[];
}



let icon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconSize: [12.5, 20.5],
    iconAnchor: [6.25,20.5],
});





const MapComponent = ({ locations = [], types = [], newLocationPosition, setNewLocationPosition }: IMapComponentProps) => {

    const { locationId } = useParams<{ locationId: string; }>()

    const [activeMarkerId, setActiveMarkerId] = useState<string>();
    
    const [filters, setFilters] = useState([]);

    const filteredLocations = useCallback(() => {
        return filters.length == 0 ? locations : locations.filter(location => filters.includes(location.type.name))
    }, [locations, filters])

    const mapRef = useCallback(map => {
        if (map !== null) {
            if (locationId != undefined && locations.length != 0) {
                const location = locations.find(location => location._id == locationId).location.coordinates;
                console.log("zooming to lcoation: " + locationId)
                map.setView(location, 12);
                setActiveMarkerId(locationId)
            }
        }
      }, [locationId, locations]);

    //   const onFilterChange = (filters) => {
    //     console.log(filters)
    //     setFilters(filters)
    //   }

    return (
        <MapContainer ref={mapRef} maxBounds={[]} minZoom={2} className="h-full w-full" center={[0,0]} zoom={2} scrollWheelZoom={true} preferCanvas={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* ----- Markers ----- */}
            <MarkerClusterGroup maxClusterRadius={140} showCoverageOnHover={false} disableClusteringAtZoom={6}>
                {filteredLocations().map((location, i) => {
                    return (
                        <LocationMarker showPopup={activeMarkerId == location._id} onClick={(id) => setActiveMarkerId(id)} id={location._id} icon={icon} key={i} position={location.location.coordinates}>
                            <Popup>
                                <p>{location.type.name}</p>
                            </Popup>
                        </LocationMarker>
                    )
                })}
            </MarkerClusterGroup>


            <MyLocationMarker /> {/* My Location Marker */}

            {/* New Location Marker */}
            { setNewLocationPosition && newLocationPosition && <NewLocationMarker setPosition={setNewLocationPosition} position={newLocationPosition} /> }


            {/* Controls & Overlays */}
            { types.length != 0 && <TypesFilterOverlay types={types} setFilters={setFilters} /> }

            <div className="leaflet-top leaflet-left" style={{ marginTop: "73px" }}>
                <LocateControl />
                {document.fullscreenEnabled && <FullscreenControl />}
            </div>
        </MapContainer>
    )
}

export default MapComponent