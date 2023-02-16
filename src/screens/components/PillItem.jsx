import React from "react";
import "../../assets/style.css";

export default function PillItem(props){
    const {title} = props;

    return(
        <p className="pill-item">{title}</p>
    );

}