import React from 'react'
import Button from "./Button"
import { Link } from "react-router-dom";

let types=["normal", "bug", "dark", "dragon", "electric", "fairy", "fighting",
       "fire", "flying", "ghost", "grass", "ground", "ice", "poison", "psychic",
       "steel", "rock", "water"]

const Buttons = props => {
  return(
    <div id="type_icons">
    {types.map( type => {
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
    })}
    </div>
  )
}

export default Buttons
