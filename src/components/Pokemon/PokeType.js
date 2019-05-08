import React from "react"
import { Link } from "react-router-dom";

const PokeTypes = props => {
  let pokemon = props.pokemon
  return(
    <p>
      Type:
      {pokemon.types
        .map(type => (
          <Link key={type.type.name} to={`/type/${type.type.name}`}>
            {props.capitalize(type.type.name)}
          </Link>
        ))
        .reduce((prev, curr) => [prev, " | ", curr])}
    </p>
  )
}

export default PokeTypes
