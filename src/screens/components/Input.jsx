import React from "react";

export default function PrimaryInput(props){
    const {placeholder, type, disabled, autocomplete, onChange, defaultValue} = props;

    return(
        <>
        <small>{placeholder}</small>
        <input className="primary-input" defaultValue={defaultValue} onChange={event => onChange(event)} disabled={disabled} autoComplete={autocomplete} type={type} placeholder={placeholder}/>
        </>
    )
}