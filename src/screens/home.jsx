import React, {useEffect, useState} from "react";

import LargeListItem from "./components/LargeListItem";
import "../assets/style.css"
import Header from "./components/Header"
import AddItemButton from "./components/AddItemButton";
import AddStore from "./components/LargeFormModals/AddStore";

export default function Home(props){
   const {token, baseUrl} = props;
   const [storesArray, setStoresArray] = useState([]);
   const [addStoreModalShowing, setAddStoreModalShowing] = useState(false);

   useEffect(()=>{
    fetchStores()
   },[])

   const fetchStores = () => {
    const url = `${baseUrl}/get-stores`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = () => {
        if(xhr.status == 200 && xhr.readyState == "4"){
           setStoresArray(JSON.parse(xhr.response))
        }
    }
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send();
   }

    return(
        <div className="logged-in">
            <div class="top-header">
                <Header text={"Stores List"}/>
                <button onClick={()=>window.location.href="/users"} className="manage-users">Manage Users</button>
            </div>
            <br/>
            <div class="page-content">
                <table>
                {setStoresArray.length > 0 &&
                <tr>
                    <td className="b">Description</td>
                    <td className="b">Address</td>
                    <td className="b">City</td>
                    <td className="b">Province</td>
                    <td className="b">Postal Code</td>
                </tr>
                }
                    
                {storesArray.length > 0
                ?
                storesArray.map(store => {
                    return (
                    <LargeListItem key={storesArray.indexOf(store)} onClick={()=>{window.location.href=`store?id=${store.id}`}}>
                        <td>{store?.description || "--"}</td>
                        <td>{store?.address || "--"}</td>
                        <td>{store?.city || "--"}</td>
                        <td>{store?.province || "--"}</td>
                        <td>{store?.postal_code || "--"}</td>
                    </LargeListItem>
                    )
                })
                :
                <td>Stores show here...</td>
            }
            </table>
        </div>
            <AddItemButton title="Add Store" onClick={()=>{setAddStoreModalShowing(true)}}/>
            {addStoreModalShowing && <div classNmae="modal"><AddStore token={token} baseUrl={baseUrl} hideModal={(modalShowing)=>setAddStoreModalShowing(modalShowing)}/></div>}
        </div>
        
    );
}
