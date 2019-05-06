import React from "react"
import Suggestions from "./Suggestions"

const SearchBox = props => {
  return(
    <div className="searchbox">
      <form onSubmit={props.handleSubmit}>
        <input
          type="search"
          value={props.query}
          onChange={props.handleInput}
        />
        <Suggestions
          suggestions={props.suggestions}
          handleFetch={props.handleFetch}
        />
      </form>
    </div>
)}

export default SearchBox
