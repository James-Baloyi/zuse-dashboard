import React, {useEffect, useState} from "react";

import Header, {MidHeader} from "./components/Header";
import PillItem from "./components/PillItem";
import AddItemButton from "./components/AddItemButton";
import AddStoreItemModal from "./components/LargeFormModals/AddStoreItem";
import EditStoreItemModal from "./components/LargeFormModals/EditStoreItem";
import LargeListItem from "./components/LargeListItem";

export default function StoreItems(props){
    const {baseUrl, token} = props;
    
    const [storeDetails, setStoreDetails] = useState({});
    const [storeId, setStoreId] = useState();
    const [addStoreItemModalShowing, setAddStoreItemModalShowing] = useState(false);
    const [editStoreItemModalShowing, setEditStoreItemModalShowing] = useState(false);
    const [storeItems, setStoreItems] = useState([]);
    const [selectedStoreItem, setSelectedStoreItem] = useState({})

    useEffect(()=>{
        fetchStores()
    },[])
    
       const fetchStores = () => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id"); 
        setStoreId(id);
        const url = `${baseUrl}/view-store/${id}`;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {
            if(xhr.status == 200 && xhr.readyState == "4"){
               const res = JSON.parse(xhr.response);
               setStoreDetails(res)
               setStoreItems(res.inventory)
            }
        }
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.send();
       }
    return(
        <div className="logged-in">
        <div className="top-header">
            <Header text={"Store Inventory"}/>
        </div>

        <br/>
        <div className="page-content">
            <MidHeader text={storeDetails.description}/>
            <p className="no-padding">{storeDetails.address}, {storeDetails.city}, {storeDetails.province}, {storeDetails.postal_code}</p>  
            <div className="contact-information-parent">
            <PillItem title={storeDetails.contact_person}/>
            <PillItem title={storeDetails.contact_number}/>
            <PillItem title={storeDetails.email}/>
            </div>

            <div className="table">
            <table>
                {storeItems.length > 0 &&
                <tr>
                    <td className="b">Item Code</td>
                    <td className="b">Description</td>
                    <td className="b">Stock on Hand</td>
                    <td className="b">Cost</td>
                    <td className="b">Price</td>
                </tr>
                }
                    
                {storeItems.length > 0
                ?
                storeItems.map(item => {
                    return (
                    <LargeListItem key={storeItems.indexOf(item)}>
                        <td>{item?.product_code || "--"}</td>
                        <td>{item?.product_description || "--"}</td>
                        <td>{item?.stock_on_hand || 0}</td>
                        <td>{item?.price_1 || "--"}</td>
                        <td>{item?.cost || "--"}</td>
                        <td><button className="edit-button" onClick={()=>{setSelectedStoreItem(item); setEditStoreItemModalShowing(true)}}>Edit</button></td>
                    </LargeListItem>
                    )
                })
                :
                <td>Stores show here.</td>
            }
            </table>
            </div>


        </div>
        <AddItemButton title="Add Store Item" onClick={()=>{setAddStoreItemModalShowing(true)}}/>
        {addStoreItemModalShowing && <div classNmae="modal"><AddStoreItemModal token={token} storeId={storeId} baseUrl={baseUrl} hideModal={(modalShowing)=>setAddStoreItemModalShowing(modalShowing)}/></div>}
        {editStoreItemModalShowing && <div classNmae="modal"><EditStoreItemModal token={token} storeId={storeId} baseUrl={baseUrl} storeItem={selectedStoreItem} hideModal={(modalShowing)=>setEditStoreItemModalShowing(modalShowing)}/></div>}
        </div>
    );
}