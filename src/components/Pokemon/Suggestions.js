import React from "react"

const Suggestions = props => {
  return(
    <ul className="suggestions">
      {props.suggestions.map(suggestion => {
        return (
          <li
            className="list-items"
            key={suggestion}
            onClick={() => props.handleFetch(suggestion)}
          >
            {suggestion}
          </li>
        );
      })}
    </ul>
  )
}

export default Suggestions
