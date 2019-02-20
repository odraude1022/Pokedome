import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return(
    <div className="links">
      <Link to="/"> Home </Link>  |  <Link to="/type/search"> Search By Type </Link>  |
      <Link to="/pokemon/search"> Search By Name </Link>  |
      <Link to="/move/search"> Search Moves </Link>
    </div>
  )
}

export default Navbar
