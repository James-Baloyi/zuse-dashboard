import React from "react";
import "../../assets/style.css"


export default function AddItemButton(props){
    const {title, onClick} = props;

    return(
        <button className="add-item-button" onClick={onClick}>{title}</button>
    );
}