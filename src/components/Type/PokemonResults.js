import React from 'react'
import { Link } from "react-router-dom";

const PokemonResults = props => {
  let sprites = props.sprites
  return(
    <div className="results">
      {sprites.map(sprite => {
        return (
          <div className="result" key={sprite.name}>
            <Link to={`/pokemon/${sprite.name}`}>
              {props.capitalize(sprite.name)}
              {sprite.sprites.front_default && (
                <img
                  className="spriter"
                  src={sprite.sprites.front_default}
                  alt="test"
                />
              )}
            </Link>
          </div>
        );
      })}{" "}
    </div>
  )
}

export default PokemonResults
