import React, {useState} from "react";

import PrimaryInput from "../Input";
import Header from "../Header";
import Button from "../Button";
import Select from "../Select";
import CloseModal from "../CloseModal";

export default function AddStoreItemModal(props){
    const {token, baseUrl, user, hideModal} = props;
    
    const initialState = user;
    const [formState, setFormState] = useState(initialState);

    const submitForm = () => {
            const url = `${baseUrl}/update-user`;
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
           xhr.send(JSON.stringify(formState));
    }

    return(
        <div className="overlay">
            <CloseModal onclick={()=>{hideModal(false)}}/>
            <div className="modal-shadowed">
                <Header text="Edit User"/>
                <form onSubmit={(event)=>{event.preventDefault()}}>
                <PrimaryInput type="text" defaultValue={user.username} name="username" id="username" placeholder="Username" onChange={(event)=>{setFormState({...formState, username: event.target.value})}}/>
                <PrimaryInput type="email" defaultValue={user.email} name="email" id="email" placeholder="Email" onChange={(event)=>{setFormState({...formState, email: event.target.value})}}/>
                <Select placeholder={"Block user?"} selectOptions={[{name: "Active", value: false}, {name: "Blocked", value: true}]} defaultValue={user.blocked == "Blocked" ? true : false} onChange={(event)=>{console.log(event);setFormState({...formState, blocked: event.target.value})}}/>
                <Button title="Edit User" clickHandler={()=>{submitForm()}}/>
                </form>
            </div>
        </div>
    );
}

