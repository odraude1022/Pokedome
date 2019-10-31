import React from 'react'
import Button from "./Button"

let types=["normal", "bug", "dark", "dragon", "electric", "fairy", "fighting",
       "fire", "flying", "ghost", "grass", "ground", "ice", "poison", "psychic",
       "steel", "rock", "water"]

const Buttons = props => {
  return(
    <div id="type_icons">
      {types.map( type => (
          <Button key={type} type={type} handleParameter={props.handleParameter} />
      ))
      }
    </div>
  )
}

export default Buttons
