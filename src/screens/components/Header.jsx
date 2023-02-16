import React from "react";
import "../../assets/style.css";

export default function Header(props){
    const {text} = props;
    return(
        <h1 className="l-header">{text}</h1>
    );
}


export function MidHeader(props){
    const {text} = props;
    return(
        <h1 className="m-header">{text}</h1>
    );
}