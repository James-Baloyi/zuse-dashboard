import React, {useState, useEffect} from "react";

import LargeListItem from "./components/LargeListItem";
import Header from "./components/Header";
import AddItemButton from "./components/AddItemButton";
import AddUser from "./components/LargeFormModals/AddUser";
import EditUser from "./components/LargeFormModals/EditUser";

export default function Users(props){
    const {token, baseUrl, role} = props;
    const [usersList, setUsersList] = useState([])
    const [addUserModalShowing, setAddUserModalShowing] = useState(false);
    const [editUserModalShowing, setEditUserModalShowing] = useState(false);
    const [selectedUser, setSelectedUser] = useState({})

    useEffect(()=>{
        fetchUsers();
    },[])

    const fetchUsers = () => {
        const url = `${baseUrl}/get-users`;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {
            if(xhr.status == 200 && xhr.readyState == "4"){
               const res = JSON.parse(xhr.response);
               setUsersList(res);
            }
        }
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.send();
       }


    const deleteUser = (id) => {
        const params = {user_id: id}
        const url = `${baseUrl}/delete-user`;
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = () => {
            if(xhr.readyState == "4" && xhr.status == 200){
                const res = JSON.parse(xhr.response);
                window.location.reload();
            }
        }
        xhr.setRequestHeader('content-type', 'application/json')
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.send(JSON.stringify(params))
    }

    return(
        <div className="logged-in">
        <div class="top-header">
            <Header text={"Users List"}/>
            <button onClick={()=>window.location.href="/"} className="manage-users">Manage Stores</button>
        </div>
        <br/>
        <div className="page-content">
        <div className="table">
            <table>
                {usersList.length > 0 &&
                <tr>
                    <td className="b">Username</td>
                    <td className="b">Email</td>
                    <td className="b">Role</td>
                    <td className="b">Blocked</td>
                </tr>
                }
        {usersList.length > 0
            ?
            usersList.map(user => {
                return (
                <LargeListItem key={usersList.indexOf(user)}>
                    <td>{user.username || "--"}</td>
                    <td>{user.email || "--"}</td>
                    <td>{user.role || "--"}</td>
                    <td>{user.blocked || "--"}</td>
                    {role === "admin"&&
                    <><td><button className="edit-button" onClick={()=>{setSelectedUser(user); setEditUserModalShowing(true)}}>Edit</button></td>
                    <td><button className="edit-button" onClick={()=>{deleteUser(user.id)}}>Delete</button></td></>}
                </LargeListItem>
                )
            })
            :
            <td>Users show here.</td>
        }
        </table>
         </div>
         </div>
         <AddItemButton title="Add User" onClick={()=>{setAddUserModalShowing(true)}}/>
         {addUserModalShowing && <div classNmae="modal"><AddUser token={token} baseUrl={baseUrl} hideModal={(modalShowing)=>setAddUserModalShowing(modalShowing)}/></div>}
         {editUserModalShowing && <div classNmae="modal"><EditUser token={token} baseUrl={baseUrl} user={selectedUser} hideModal={(modalShowing)=>setEditUserModalShowing(modalShowing)}/></div>}
         </div>
    );
   
}