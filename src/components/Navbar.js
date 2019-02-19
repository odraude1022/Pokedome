import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return(
    <div class="links">
      <Link to="/"> Home </Link>  |  <Link to="/type/:type"> Search By Type </Link>  |  
      <Link to="/name/:name"> Search By Name </Link>  |
      <Link to="/move/:move"> Search Moves </Link>
    </div>
  )
}

export default Navbar
