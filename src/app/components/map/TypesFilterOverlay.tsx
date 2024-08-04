import { IType } from '@/models/Type';
import { CSSProperties } from 'react';

export default function TypesFilterOverlay({ types, setFilters }) {

    const overlayStyles: CSSProperties = {
        top: 10,
        left: 53,
        position: "absolute",
        zIndex: 1000
    }

    const datalistStyles: CSSProperties = {
        position: "absolute",
        backgroundColor: "white",
        width: "100%"
    }

    return (
        <div style={overlayStyles}>
            <select className="form-select" name="" id="" onChange={(e) => setFilters(e.target.value)}>
                {types.map((type, key) => {
                    return <option key={key} value={type.name}>{type.name}</option>
                })}
            </select>
            {/* <div style={datalistStyles}>
                {types.map((type, key) => {
                    return (
                        <div key={key}>
                            {type.name}
                        </div>
                    )
                })}
            </div> */}
        </div>
    )
}