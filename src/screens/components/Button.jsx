import React from "react";

import "../../assets/style.css";

export default function Button(props){
    const {title, clickHandler} = props;

    return(
        <button className="primary-button" onClick={clickHandler}>
            {title}
        </button>
    );   
}