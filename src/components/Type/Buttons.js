import React from 'react'
import Button from "./Button"
import { Link } from "react-router-dom";

const Buttons = props => {
  return(
    <div id="type_icons">
      <Link to={`/type/normal`}>
        <img
          className="type_icon"
          src="/images/types/normal_icon.jpg"
          onClick={() => props.handleParameter("normal")}
          alt="normal"
        />
      </Link>
      <Link to={`/type/bug`}>
        <img
          className="type_icon"
          src="/images/types/bug_icon.jpg"
          onClick={() => props.handleParameter("bug")}
          alt="bug"
        />
      </Link>
      <Link to={`/type/dark`}>
        <img
          className="type_icon"
          src="/images/types/dark_icon.jpg"
          onClick={() => props.handleParameter("dark")}
          alt="dark"
        />
      </Link>
      <Link to={`/type/dragon`}>
        <img
          className="type_icon"
          src="/images/types/dragon_icon.jpg"
          onClick={() => props.handleParameter("dragon")}
          alt="dragon"
        />
      </Link>
      <Link to={`/type/electric`}>
        <img
          className="type_icon"
          src="/images/types/electric_icon.jpg"
          onClick={() => props.handleParameter("electric")}
          alt="electric"
        />
      </Link>
      <Link to={`/type/fairy`}>
        <img
          className="type_icon"
          src="/images/types/fairy_icon.jpg"
          onClick={() => props.handleParameter("fairy")}
          alt="fairy"
        />
      </Link>
      <Link to={`/type/fighting`}>
        <img
          className="type_icon"
          src="/images/types/fighting_icon.jpg"
          onClick={() => props.handleParameter("fighting")}
          alt="fighting"
        />
      </Link>
      <Link to={`/type/fire`}>
        <img
          className="type_icon"
          src="/images/types/fire_icon.jpg"
          onClick={() => props.handleParameter("fire")}
          alt="fighting"
        />
      </Link>
      <Link to={`/type/flying`}>
        <img
          className="type_icon"
          src="/images/types/flying_icon.jpg"
          onClick={() => props.handleParameter("flying")}
          alt="flying"
        />
      </Link>
      <Link to={`/type/ghost`}>
        <img
          className="type_icon"
          src="/images/types/ghost_icon.jpg"
          onClick={() => props.handleParameter("ghost")}
          alt="ghost"
        />
      </Link>
      <Link to={`/type/grass`}>
        <img
          className="type_icon"
          src="/images/types/grass_icon.jpg"
          onClick={() => props.handleParameter("grass")}
          alt="grass"
        />
      </Link>
      <Link to={`/type/ground`}>
        <img
          className="type_icon"
          src="/images/types/ground_icon.jpg"
          onClick={() => props.handleParameter("ground")}
          alt="ground"
        />
      </Link>
      <Link to={`/type/ice`}>
        <img
          className="type_icon"
          src="/images/types/ice_icon.jpg"
          onClick={() => props.handleParameter("ice")}
          alt="ice"
        />
      </Link>
      <Link to={`/type/poison`}>
        <img
          className="type_icon"
          src="/images/types/poison_icon.jpg"
          onClick={() => props.handleParameter("poison")}
          alt="poison"
        />
      </Link>
      <Link to={`/type/psychic`}>
        <img
          className="type_icon"
          src="/images/types/psychic_icon.jpg"
          onClick={() => props.handleParameter("psychic")}
          alt="psychic"
        />
      </Link>
      <Link to={`/type/steel`}>
        <img
          className="type_icon"
          src="/images/types/steel_icon.jpg"
          onClick={() => props.handleParameter("steel")}
          alt="steel"
        />
      </Link>
      <Link to={`/type/rock`}>
        <img
          className="type_icon"
          src="/images/types/rock_icon.jpg"
          onClick={() => props.handleParameter("rock")}
          alt="rock"
        />
      </Link>
      <Link to={`/type/water`}>
        <img
          className="type_icon"
          src="/images/types/water_icon.jpg"
          onClick={() => props.handleParameter("water")}
          alt="water"
        />
      </Link>
    </div>
  )
}

export default Buttons
