'use client'
import { createLocation } from "@/app/actions";
import { IType } from "@/models/Type";
import { LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useFormState } from "react-dom";
import CreatableSelect  from "react-select/creatable";

const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];

const Map = dynamic(() => import("@/app/components/map"), {
    ssr: false,
    loading: () => <p>Loading Map...</p>,
});

export default function NewLocation({ types }) {
    const [newLocationPosition, setNewLocationPosition] = useState<LatLngTuple>([0,0]);

    const initialState = { errors: [] };
    const [state, formAction, isPending] = useFormState(createLocation, initialState);

    const onLatitudeChange = (lat: number) => {
        if (!Number.isNaN(lat)) {
            setNewLocationPosition([
                ((parseFloat(lat.toFixed(6)) + 90) % 180 + 180) % 180 - 90,
                newLocationPosition[1]
            ])
        } 
    }

    const onLongitudeChange = (lng: number) => {
        if (!Number.isNaN(lng)) {
            setNewLocationPosition([
                newLocationPosition[0],
                ((parseFloat(lng.toFixed(6)) + 180) % 360 + 360) % 360 - 180,
            ])
        }
    }

    const onTypeChange = (type: string) => {
        console.log(type)
    }

    const [type, setType] = useState("")

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <div style={{ padding: "1.5rem" }}>
                <h1>New Location</h1>
                <form action={formAction}>
                    <div className="mb-3">
                    
                        <label htmlFor="type" className="form-label">Type</label>
                        <CreatableSelect 
                            onChange={(val) => console.log(val)}
                            // value={type}
                            // defaultInputValue={type}
                            // isClearable 
                            required
                            name="type"
                            instanceId={"type"}
                            options={types.map((type: IType) => ({ value: type._id, label: type.name }))}
                        />
                        {/* <input
                            onFocus={() => setShowTypesDropdown(true)}
                            onBlur={() => setShowTypesDropdown(false)}
                            onChange={(e) => onTypeChange(e.target.value)}
                            required
                            className="form-control"
                            type="text"
                            name="type" id="type"
                            /> */}
                        
                        {/* <TypesDropdownMenu /> */}
                        {/* <div ref={}>

                        </div> */}

                        {/* <select id="type" name="type" className="form-select" aria-label="Location type"> */}
                            {/* Load types from DB */}
                        {/* </select> */}
                    </div>
                    
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="latitude" className="form-label">Latitude</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                id="latitude" name="latitude"
                                max={90} min={-90} step="any"
                                value={newLocationPosition[0]}
                                onChange={(e) => onLatitudeChange(parseFloat(e.target.value))} />
                        </div>
                        <div className="col">
                            <label htmlFor="longitude" className="form-label">Longitude</label>
                            <input
                                required
                                type="number"
                                className="form-control"
                                aria-label="Longitude"
                                id="longitude" name="longitude"
                                max={180} min={-180} step="any"
                                value={newLocationPosition[1]}
                                onChange={(e) => onLongitudeChange(parseFloat(e.target.value))} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" name="address" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description"></textarea>
                    </div>

                    <div className="row mb-3">
                        <label className="form-label">Season</label>
                        <div className="col">
                            <select className="form-select" name="season-start">
                                <option value="">Season start</option>
                                {months.map((month, i) => {
                                    return (<option key={i} value={month}>{month}</option>)
                                })}
                            </select>
                        </div>
                        <div className="col">
                            <select className="form-select" name="season-end">
                                <option value="">Season end</option>
                                {months.map((month, i) => {
                                    return (<option key={i} value={month}>{month}</option>)
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="access" className="form-label">Access</label>
                        <select name="access" id="access" className="form-select">
                            <option value="public">Source is on public land</option>
                            <option value="private">Source is on private land</option>
                            <option value="permitted">Source is on private land but is permitted for access</option>
                            <option value="overhanging">Source is on private land but overhangs public land</option>
                        </select>
                    </div>

                    { state.errors.map((err, i) => <p className="" key={i}>{err}</p>) }
                    <button type="submit" aria-disabled={isPending} className="btn btn-primary">Add new location</button>
                </form>
            </div>
            <div style={{ flexGrow: 1 }}>
                <Map newLocationPosition={newLocationPosition} setNewLocationPosition={setNewLocationPosition} />
            </div>

        </div>
    )
}