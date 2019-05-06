import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div id="navbars">
      <div id="pokeball1">
        <img id="Ball" src="/images/Pokeball.svg" alt="location" height="90" width="90" />
      </div>
      <div id="navbar">
        <div className="links">
          <Link to="/"> Home </Link> |{" "}
          <Link to="/type/search"> Search By Type </Link> |
          <Link to="/pokemon/search"> Search By Name </Link> |
          <Link to="/move/search"> Search Moves </Link>
        </div>
      </div>
      <div id="pokeball2">
        <img id="Ball2" src="/images/Pokeball.svg" alt="location" height="90" width="90" />
      </div>
    </div>
  );
};

export default Navbar;
