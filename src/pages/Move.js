import React from "react";
import "./move.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ScaleLoader } from 'react-spinners';

let moveNames = [];
fetch(`https://pokeapi.co/api/v2/move/?limit=746`)
  .then(res => res.json())
  .then(res => {
    res.results.map(move => {
      moveNames.push(move.name);
    });
  })
  .then(res => {
    moveNames = moveNames.sort();
  });

class Move extends React.Component {
  state = {
    query: "",
    move: null,
    effect_chance: null,
    name: null,
    type: null,
    accuracy: null,
    damage_class: null,
    effect: null,
    power: null,
    pp: null,
    suggestions: [],
    loading: true,
  };

  componentDidMount() {
    const move = this.props.match.params.move;
    this.handleFetch(move);
    this.setState({loading: false})
  }

  handleFetch = move => {
    fetch(`https://pokeapi.co/api/v2/move/${move}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          move: result,
          name: result.name,
          type: result.type.name,
          accuracy: result.accuracy,
          damage_class: result.damage_class.name,
          effect: result.effect_entries[0].effect
            .replace("$effect_chance", result.effect_chance)
            .replace("(100 - accuracy)", 100 - result.accuracy),
          effect_chance: result.effect_chance,
          power: result.power,
          pp: result.pp,
          query: "",
          suggestions: []
        });
      })
      .catch(error => {
        this.setState({
          move: null,
          name: this.state.query ? "Not Found" : "",
          type: null,
          accuracy: null,
          damage_class: null,
          effect: null,
          power: null,
          pp: null,
          query: "",
          suggestions: []
        });
      });
  };

  capitalize = string => {
    return string
      .split("-")
      .map(string => {
        return string[0].toUpperCase() + string.substring(1, string.length);
      })
      .join("-");
  };
  handleInput = event => {
    const query = event.target.value.toLowerCase();
    let suggestions = moveNames
      .filter(name => name.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 10);
    if (!query) suggestions = [];

    this.setState({ query, suggestions });
    this.setState({ query: event.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.handleFetch(this.state.query);
  };

  render() {
    const {
      move,
      name,
      accuracy,
      damage_class,
      effect,
      power,
      pp,
      loading
    } = this.state;
    return (
      <div>
        <div className="loader">
          <div>
            <ScaleLoader
              className="pacman-load"
              color={'#F8E71C'}
              size={"40"}
              loading={this.state.loading}
            />
          </div>
        </div>
        <Navbar />
        <h1>Search Moves!</h1>
        <div className="searchbox">
          <form onSubmit={this.handleSubmit}>
            <input
              type="search"
              value={this.state.query}
              onChange={this.handleInput}
            />

            <ul className="suggestions">
              {this.state.suggestions.map(suggestion => {
                return (
                  <li
                    className="list-items"
                    key={suggestion}
                    onClick={() => this.handleFetch(suggestion)}
                  >
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          </form>
        </div>
        {name && <h1>{this.capitalize(name)} </h1>}
        {move && (
          <div className="name-results">
            <div className="name-result">
              <p>
                Type:{" "}
                <Link to={`/type/${this.state.type}`}>
                  {this.capitalize(this.state.type)}
                </Link>
              </p>
              <p>Power: {power}</p>
              <p>Accuracy: {accuracy}</p>
              <p>Max PP: {pp}</p>
              <p>Category: {this.capitalize(damage_class)}</p>
              <p>Effect: {effect}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Move;
