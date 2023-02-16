import React from "react";

export default function CloseModal(props){
    const {onclick} = props;

    return(
        <button className="close-modal" onClick={onclick}>Dismiss</button>
    );
}