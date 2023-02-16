import React, {useState} from "react";

import PrimaryInput from "../Input";
import Header from "../Header";
import Button from "../Button";
import CloseModal from "../CloseModal";

export default function AddStoreModal(props){
    const initialState = {
        description: "",
        address: "",
        city: "",
        province: "",
        postal_code: "",
        contact_person: "",
        contact_number: "",
        email: ""
    }
    const {token, baseUrl, hideModal} = props;
    const [formState, setFormState] = useState(initialState);

    const submitForm = () => {
            const url = `${baseUrl}/add-store`;
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
                <Header text="Add Store"/>
                <form onSubmit={(event)=>{event.preventDefault()}}>
                <PrimaryInput type="text"  name="description" id="description" placeholder="Store Description" onChange={(event)=>{setFormState({...formState, description: event.target.value})}}/>
                <PrimaryInput name="address" id="address" type="text" placeholder="Address" onChange={(event)=>{setFormState({...formState, address: event.target.value})}}/>
                <PrimaryInput name="city" id="city" type="text" placeholder="City"  onChange={(event)=>{setFormState({...formState, city: event.target.value})}}/>
                <PrimaryInput name="province" id="Province" type="text" placeholder="Province"  onChange={(event)=>{setFormState({...formState, province: event.target.value})}}/>
                <PrimaryInput name="postal_code" id="postal_code" type="text" placeholder="Postal Code"  onChange={(event)=>{setFormState({...formState, postal_code: event.target.value})}}/>
                <PrimaryInput name="contact_person" id="contact-person" type="text" placeholder="Contact Person"  onChange={(event)=>{setFormState({...formState, contact_person: event.target.value})}}/>
                <PrimaryInput name="contact_number" id="contact-number" type="number" placeholder="Phone Number"  onChange={(event)=>{setFormState({...formState, contact_number: event.target.value})}}/>
                <PrimaryInput name="email" id="email" type="email" placeholder="Email Address"  onChange={(event)=>{setFormState({...formState, email: event.target.value})}}/>
                <Button title="Add Store" clickHandler={()=>{submitForm()}}/>
                </form>
            </div>
        </div>
    );
}

