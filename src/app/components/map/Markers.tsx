import { Icon, LatLngExpression, LatLngTuple } from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Circle, Marker, MarkerProps, useMap, Popup } from "react-leaflet";

interface LocationMarkerProps extends MarkerProps {
    id: string;
    onClick: Function;
    showPopup: Boolean;
}

export const LocationMarker: React.FC<LocationMarkerProps> = ({ id, onClick, showPopup, ...props }) => {
    // You can use the id property here if needed
  
    const markerRef = useRef(null);

    useEffect(() => {
        if (showPopup) markerRef.current.openPopup();
    }, [showPopup])

    return <Marker ref={markerRef} eventHandlers={{ click: () => onClick(id) }} {...props} >
        {props.children}
    </Marker>;
};


export const NewLocationMarker = ({ position, setPosition }: { position: LatLngTuple , setPosition: Function }) => {

    const markerRef = useRef<any>(null);
    const eventHandlers = useMemo(
        () => ({
          dragend() {
            const marker = markerRef.current
            if (marker != null) {
                let coords: Array<number> = Object.values(marker.getLatLng());
                coords[0] = ((coords[0] + 90) % 180 + 180) % 180 - 90;
                coords[1] = ((coords[1] + 180) % 360 + 360) % 360 - 180;
                coords = coords.map((coord) => parseFloat((coord as number).toFixed(6)));
                setPosition(coords)
            }
          },
        }),
        [setPosition],
    )

    let icon = new Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconSize: [25, 41],
        iconAnchor: [12.5,40],
    });

    return (
        <Marker
            icon={icon}
            position={position}
            draggable={true}
            ref={markerRef}
            eventHandlers={eventHandlers}
        >

        </Marker>
    )
}

export const MyLocationMarker = () => {
    const [position, setPosition] = useState<LatLngExpression>([0,0]);
    const [accuracy, setAccuracy] = useState(0);
    const [locationFound, setLocationFound] = useState(false);

    const map = useMap();

    function onLocationFound(e) {
        setPosition(e.latlng);
        setAccuracy(e.accuracy);
        setLocationFound(true)
    }
    
    map.on('locationfound', onLocationFound);

    return locationFound && <>
        <Circle center={position} radius={accuracy} color="#136AEC" fillColor="#136AEC" fillOpacity={0.15} weight={0} />
        <Circle center={position} radius={5} fill={true} fillOpacity={1} weight={3} opacity={1} fillColor="#2A93EE" color={"#fff"} />
    </>
}