import React from "react"
import NameResults from "./NameResults"
import MoveResults from "./MoveResults"

const Info = props => {
  let pokemon = props.pokemon

  if(Object.keys(pokemon).length > 0)
  {
    return(
      <div>
        <div className="name-results">
          <NameResults pokemon={pokemon} capitalize={props.capitalize}/>
          <h2 className="moveset-text">Moveset</h2>
        </div>
        <MoveResults pokemon={pokemon} capitalize={props.capitalize} />
      </div>
    )
  }
  else
  {
    return null
  }
}

export default Info
