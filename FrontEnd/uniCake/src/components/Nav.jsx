import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Logform from "./Logform";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem('token')
  const [isLogin,setIsLogin] = useState(token ? false : true)

  useEffect(()=>{
    setIsLogin( token ? false : true)
  })

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
        </ul>
      </header>
      {isOpen && (<Modal onClose={() => setIsOpen(false)}><Logform setIsOpen={() => setIsOpen(false)} /></Modal>
      )}
    </>
  );
}

export default Nav;
