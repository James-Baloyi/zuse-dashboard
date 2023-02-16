import React, {useState} from "react";

import PrimaryInput from "../Input";
import Header from "../Header";
import Button from "../Button";
import CloseModal from "../CloseModal";

export default function AddStoreItemModal(props){
    const {token, baseUrl, storeId, hideModal} = props;
    
    const initialState = {
        item_code: "",
        item_description: "",
        cost: "",
        price_1: "",
        store_id: storeId
    }

    const [formState, setFormState] = useState(initialState);

    const submitForm = () => {
            const url = `${baseUrl}/add-inventory`;
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            xhr.onreadystatechange = () => {
                if(xhr.readyState == "4" && xhr.status == 200){
                    const res = JSON.parse(xhr.response);
                    window.location.reload();
                }else{
                    //handle login error
                    //alert("There was an error logging you in. Please try again");
                }
            }
            xhr.send(JSON.stringify(formState));
    }

    return(
        <div className="overlay">
            <CloseModal onclick={()=>{hideModal(false)}}/>
            <div className="modal-shadowed">
                <Header text="Add Store Item"/>
                <form onSubmit={(event)=>{event.preventDefault()}}>
                <PrimaryInput type="text"  name="item_code" id="item_code" placeholder="Item Code" onChange={(event)=>{setFormState({...formState, item_code: event.target.value})}}/>
                <PrimaryInput type="text"  name="item_code" id="item_description" placeholder="Item Description" onChange={(event)=>{setFormState({...formState, item_description: event.target.value})}}/>
                <PrimaryInput type="number"  name="cost" id="cost" placeholder="Item Cost" onChange={(event)=>{setFormState({...formState, cost: event.target.value})}}/>
                <PrimaryInput type="text"  name="price_1" id="price_1" placeholder="Item Price" onChange={(event)=>{setFormState({...formState, price_1: event.target.value})}}/>
                <Button title="Add Store Item" clickHandler={()=>{submitForm()}}/>
                </form>
            </div>
        </div>
    );
}

