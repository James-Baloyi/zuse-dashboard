import React from "react";

export default function PrimarySelect(props){
    const {selectOptions, onChange, defaultValue, placeholder} = props;

    return(
        <>
        <small>{placeholder}</small>
        <select className="primary-select" defaultValue={defaultValue} onChange={event => onChange(event)}>
            {selectOptions.map(option => {
                return <option value={option.value}>{option.name}</option>
            })}
        </select>
        </>
    )
}