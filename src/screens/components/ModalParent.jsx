import React from "react";

import Header from "./Header";

export default function ModalParent(props){
    const {children, title} = props;
    return(
        <div className="modal-parent">
            <Header text={title}/>
            {children}
        </div>
    );
}