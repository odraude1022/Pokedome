import React from 'react'
import { Link } from "react-router-dom";

const Info = props => {
  let {name, move, type, power, accuracy, pp, damage_class, effect} = props
  return(
    <div>
      {name && <h1>{props.capitalize(name)} </h1>}
      {move && (
        <div className="name-results">
          <div className="name-result">
            <p>
              Type:{" "}
              <Link to={`/type/${type}`}>
                {props.capitalize(type)}
              </Link>
            </p>
            <p>Power: {props.power}</p>
            <p>Accuracy: {accuracy}</p>
            <p>Max PP: {pp}</p>
            <p>Category: {props.capitalize(damage_class)}</p>
            <p>Effect: {effect}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Info
