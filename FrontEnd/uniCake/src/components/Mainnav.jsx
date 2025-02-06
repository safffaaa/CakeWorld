
import React from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import Foot from "./Footer";

function Mainnav() {
  return (
    <>
      <Nav />
      <Outlet />
      <Foot />
    </>
  );
}

export default Mainnav;
