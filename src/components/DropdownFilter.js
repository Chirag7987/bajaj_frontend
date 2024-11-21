import React from "react";
import Select from "react-select";

const DropdownFilter = ({ onChange }) => {
    const options = [
        { value: "Numbers", label: "Numbers" },
        { value: "Alphabets", label: "Alphabets" },
        { value: "Highest Lowercase Alphabet", label: "Highest Lowercase Alphabet" },
    ];

    return (
        <div className="dropdown-filter">
            <h3>Multi-Filter</h3>
            <Select
                options={options}
                isMulti
                onChange={onChange}
                placeholder="Select filters..."
            />
        </div>
    );
};

export default DropdownFilter;
