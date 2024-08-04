import { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";

export const FullscreenControl = () => {
    
    const map = useMap();

    const [isFullscreen, setIsFullscreen] = useState(document.fullscreenEnabled);

    const expandIcon = "fa-solid fa-xl fa-expand";
    const compressIcon = "fa-solid fa-xl fa-compress";

    const onClick = () => {
        setIsFullscreen(state => !state)
        isFullscreen ? map.getContainer().requestFullscreen() : document.exitFullscreen()
    }

    return (
        <div className="leaflet-control leaflet-bar">
            <a onClick={onClick} href="#" role="button" style={{ lineHeight: "30px", width: "30px", height: "30px" }}>
                <i className={isFullscreen ? compressIcon : expandIcon}></i>
            </a>
        </div>
    )
}

export const LocateControl = () => {
    const map = useMap();

    const onClick = () => {
        map.locate({ watch: true, setView: true, maxZoom: 16});
    }

    return (
        <div className="leaflet-control leaflet-bar">
            <a onClick={onClick} href="#" role="button" style={{ lineHeight: "30px", width: "30px", height: "30px" }}>
                <i className="fa-solid fa-location-crosshairs fa-xl"></i>
            </a>
        </div>
    )
}