import React, {useState} from "react";
import "../assets/style.css";

import ModalParent from "./components/ModalParent";
import PrimaryInput from "./components/Input";
import Button from "./components/Button";

export default function Login(props){
    const {baseUrl} = props;
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const signIn = () => {
        const params = {"username": username, "password": password}
        const url = `http://10.0.0.45:5000/api/login`;
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == "4" && xhr.status == 200){
                const res = JSON.parse(xhr.response);
                const token = res.token;
                const role = res.role;
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                window.location.href = "/home"
            }else{
                //handle login error
                //alert("There was an error logging you in. Please try again");
            }
        }
        xhr.send(JSON.stringify(params));
    }

    return(
        <div id="login-parent" className="login-parent"><br/>
            <ModalParent title={"Modal"}>
                <PrimaryInput type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}/>
                <PrimaryInput type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <Button title="Sign In" clickHandler={()=>signIn()} />
            </ModalParent>
        </div>
    );
}