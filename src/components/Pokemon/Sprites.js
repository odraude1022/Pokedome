import React from "react"

const Sprites = props => {
  let pokemon = props.pokemon
  return(
    <div className="spritez">
      {pokemon.sprites.front_default && (
        <img
          width="150px"
          src={pokemon.sprites.front_default}
          alt="sprite of pokemon from the front"
        />
      )}
      {pokemon.sprites.back_default && (
        <img
          width="150px"
          src={pokemon.sprites.back_default}
          alt="sprite of pokemon from the back"
        />
      )}
    </div>
  )
}

export default Sprites
