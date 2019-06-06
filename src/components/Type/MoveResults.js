import React from 'react'
import { Link } from "react-router-dom";

const MoveResults = props => {
  let moves = props.moves
  return(
    <div className="move-results">
      {moves
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
        .map(move => (
          <div key={move.name}>
            <Link to={`/move/${move.name}`}>
              {props.capitalize(move.name)}
            </Link>
          </div>
        ))}
    </div>
  )

}

export default MoveResults
