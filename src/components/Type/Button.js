import React from 'react'
import { Link } from "react-router-dom";

const Button = props => {
  let type = props.type
  return(
    <Link to={`/type/${type}`}>
      <img
        className="type_icon"
        src={`/images/types/${type}_icon.jpg`}
        onClick={() => props.handleParameter(type)}
        alt={type}
      />
    </Link>
  )
}

export default Button
