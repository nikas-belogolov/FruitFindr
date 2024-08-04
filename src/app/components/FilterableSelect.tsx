
import Select from 'react-select';

export default function FilterableSelect({ isMulti = false }) {


    return (
        <div>
                <Select
                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                    isMulti={isMulti}
                    name="colors"
                    // options={colourOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
        </div>
    )
}