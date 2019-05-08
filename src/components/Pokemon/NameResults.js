import React from "react"
import { Link } from "react-router-dom";
import Sprites from "./Sprites"
import PokeType from "./PokeType"
import BaseStats from "./BaseStats"

const NameResults = props => {
  let pokemon = props.pokemon
  return(
    <div className="name-result">
      <Sprites pokemon={pokemon} />
      <PokeType pokemon={pokemon} capitalize={props.capitalize} />
      <BaseStats pokemon={pokemon} capitalize={props.capitalize}/>
    </div>
  )
}

export default NameResults
