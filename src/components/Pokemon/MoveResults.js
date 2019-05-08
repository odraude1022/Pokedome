import React from "react"
import { Link } from "react-router-dom";


const MoveResults = props => {
  let pokemon = props.pokemon
  return(
    <div className="move-results">
      {pokemon.moves
        .sort((a, b) => {
          if (a.move.name < b.move.name) return -1;
          if (a.move.name > b.move.name) return 1;
          return 0;
        })
        .map(move => (
          <div key={move.move.name}>
            <Link to={`/move/${move.move.name}`}>
              {props.capitalize(move.move.name)}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default MoveResults
