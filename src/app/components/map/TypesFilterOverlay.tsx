import { IType } from '@/models/Type';
import { CSSProperties } from 'react';
import Select from 'react-select';

export default function TypesFilterOverlay({ types, setFilters }) {

    const overlayStyles: CSSProperties = {
        top: 10,
        left: 53,
        position: "absolute",
        zIndex: 10000,
        minWidth: "200px"
    }

    return (
        <div style={overlayStyles}>
            <Select
                isMulti
                onChange={(e: any) => setFilters(e.map(e => e.label))}
                name="color"
                placeholder="Filters..."
                options={types.map(type => ({
                    value: type.name,
                    label: type.name
                }))}
            />
        </div>
    )
}