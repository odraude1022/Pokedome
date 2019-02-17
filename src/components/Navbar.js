import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return(
    <div>
      <Link to="/">Home</Link><Link to="/type">Search By Type</Link>
      <Link to="/name">Search By Name</Link>
      <Link to="/move/:move">Search Moves</Link>
    </div>
  )
}

export default Navbar
