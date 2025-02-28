import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Logform from "./Logform";
import { FaUserCircle } from "react-icons/fa";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem('token')
  const [isLogin,setIsLogin] = useState(token ? false : true)

  let user = JSON.parse(localStorage.getItem("user"))

  useEffect(()=>{
    setIsLogin( token ? false : true)
  },[token])

  const checkLogin = () => {
    if(token){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsLogin(true)
    }else {
     setIsOpen(true);     
    }
  };

  return (
    <>
      <header>
        <h2>cake blog</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li onClick={()=>isLogin && setIsOpen(true)}><Link to={!isLogin ?"/MyRecipe": "/"}>My Recipe</Link></li>
          <li onClick={()=>isLogin && setIsOpen(true)}><Link to={!isLogin ?"/MyFav" : "/"}>Favourites</Link></li>
          <li onClick={checkLogin}>{(isLogin)? "Login" : "Logout"}</li>
          <li ><Link to={user ? `/Profile/${user.id}` : "/"}><FaUserCircle /></Link></li>
        </ul>
      </header>
      {isOpen && (<Modal onClose={() => setIsOpen(false)}><Logform setIsOpen={() => setIsOpen(false)} /></Modal>
      )}
    </>
  );
}

export default Nav;
