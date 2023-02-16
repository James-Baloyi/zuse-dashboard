import React from "react";

import "../../assets/style.css";

export default function LargeListItem(props){
    const {key, children, onClick} = props;
    return(
        <tr className="tr" key={key} onClick={onClick}>
            {children}
        </tr>
    );
}