import React from 'react'

const SearchBox = props => {
  return(
    <div className="searchbox">
      <form onSubmit={props.handleSubmit}>
        <input
          type="search"
          value={props.query}
          onChange={props.handleInput}
        />

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
      </form>
    </div>
  )
}

export default SearchBox
