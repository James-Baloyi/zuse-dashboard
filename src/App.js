import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./screens/login";
import Home from "./screens/home";
import Users from "./screens/users";
import StoreItems from "./screens/store-items";

export default function App(props){
  const isUserLoggedIn = () => {
    const loginStatus = localStorage.getItem("token");
    return loginStatus
  }

  if(isUserLoggedIn() == null){
  return(
    <Routes>
      <Route path="/"  element={<Login/>} />
    </Routes>
  )
  }else{
    return(
    <Routes>
      <Route path="/"  element={<Home {...props} />} />
      <Route path="/home"  element={<Home {...props} />} />
      <Route path="/users"  element={<Users {...props}/> } />
      <Route path="/store"  element={<StoreItems {...props} />} />
    </Routes>
    )
}
}