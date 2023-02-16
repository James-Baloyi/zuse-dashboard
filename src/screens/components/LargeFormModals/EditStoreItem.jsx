import React, {useState} from "react";

import PrimaryInput from "../Input";
import Header from "../Header";
import Button from "../Button";
import CloseModal from "../CloseModal";

export default function EditStoreItemModal(props){
    const {token, baseUrl, storeItem, hideModal} = props;
    
    const initialState = storeItem;

    const [formState, setFormState] = useState(initialState);

    const submitForm = () => {
            const url = `${baseUrl}/update-item/${storeItem.id}`;
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

            console.warn(formState)
            
            const requestObject = {
                product_code: formState.product_code,
                product_description: formState. product_description,
                stock_on_hand: formState.stock_on_hand,
                cost: formState.cost,
                price_1: formState.price_1,
            }
            
            xhr.send(JSON.stringify(requestObject));
            
    }

    return(
        <div className="overlay">
            <CloseModal onclick={()=>{hideModal(false)}}/>
            <div className="modal-shadowed">
                <Header text="Edit Store Item"/>
                <form onSubmit={(event)=>{event.preventDefault()}}>
                <PrimaryInput type="text" defaultValue={storeItem.product_code} name="item_code" id="item_code" placeholder="Item Code" onChange={(event)=>{setFormState({...formState, product_code: event.target.value})}}/>
                <PrimaryInput type="text"  defaultValue={storeItem.product_description} name="item_code" id="item_description" placeholder="Item Description" onChange={(event)=>{setFormState({...formState, product_description: event.target.value})}}/>
                <PrimaryInput type="number" defaultValue={storeItem.cost} name="cost" id="cost" placeholder="Item Cost" onChange={(event)=>{setFormState({...formState, cost: event.target.value})}}/>
                <PrimaryInput type="text"  defaultValue={storeItem.price_1} name="price_1" id="price_1" placeholder="Item Price" onChange={(event)=>{setFormState({...formState, price_1: event.target.value})}}/>
                <PrimaryInput type="text" defaultValue={storeItem.stock_on_hand} name="stock_on_hand" id="stock_on_hand" placeholder="Stock on Hand" onChange={(event)=>{setFormState({...formState, stock_on_hand: event.target.value})}}/>
                <Button title="Edit Store Item" clickHandler={()=>{submitForm()}}/>
                </form>
            </div>
        </div>
    );
}

