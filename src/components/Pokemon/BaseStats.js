import React from "react"

const BaseStats = props => {
  let pokemon = props.pokemon
  return(
    <div>
      <h2>Base Stats</h2>
      <ul>
        {pokemon.stats.map(stat => (
          <li key={stat.stat.name}>{`${props.capitalize(
            stat.stat.name
          )}: ${stat.base_stat}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default BaseStats
