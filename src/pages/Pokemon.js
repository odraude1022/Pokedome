import React from "react";
import Navbar from "../components/Navbar";
import "./Name.css";
import { Link } from "react-router-dom";


let pokemonNames = [];
let pokemonObjects;
fetch(`https://pokeapi.co/api/v2/pokemon/?limit=964`)
  .then(res => res.json())
  .then(res => {
    res.results.map(mon => {
      pokemonNames.push(mon.name);
    });
  });

class Pokemon extends React.Component {
  state = {
    error: null,
    name: null,
    types: null,
    stats: null,
    moves: null,
    pokemon: this.props.pokemon || {},
    query: "",
    suggestions: []
  };

  componentDidMount() {
    const name = this.props.match.params.name;
    this.handleFetch(name);
  }

  handleFetch = name => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          pokemon: result,
          name: result.name,
          types: result.types,
          stats: result.stats,
          moves: result.moves,
          query: "",
          suggestions: []
        });
      })
      .catch(error => {
        this.setState({
          pokemon: {},
          name: this.state.query ? "Not Found" : "",
          error: error,
          types: null,
          stats: null,
          moves: null,
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
    const query = event.target.value
      .toLowerCase()
      .replace("#", "")
      .replace(".", "")
      .replace("?", "");

    let suggestions = pokemonNames
      .filter(name => name.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 10);
    if (!query) suggestions = [];

    this.setState({ query, suggestions });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.query) {
      return;
    }
    this.handleFetch(this.state.query);
  };
  render() {
    const { pokemon } = this.state;
    return (
      <div>
        <Navbar />
        <h1>Search Pokemon By Name!</h1>
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
        {this.state.pokemon.id && this.state.name && (
          <h1>
            #{this.state.pokemon.id}: {this.capitalize(this.state.name)}{" "}
          </h1>
        )}
        {!this.state.pokemon.id && this.state.name && (
          <h1>{this.capitalize(this.state.name)}</h1>
        )}
        {Object.keys(pokemon).length > 0 && (
          <div>
            <div className="name-results">
              <div className="name-result">
                <div className="spritez">
                  {this.state.pokemon.sprites.front_default && (
                    <img
                      width="150px"
                      src={this.state.pokemon.sprites.front_default}
                      alt="sprite of pokemon from the front"
                    />
                  )}
                  {this.state.pokemon.sprites.back_default && (
                    <img
                      width="150px"
                      src={this.state.pokemon.sprites.back_default}
                      alt="sprite of pokemon from the back"
                    />
                  )}
                </div>
                <p>
                  Type:
                  {pokemon.types
                    .map(type => (
                      <Link key={type.type.name} to={`/type/${type.type.name}`}>
                        {this.capitalize(type.type.name)}
                      </Link>
                    ))
                    .reduce((prev, curr) => [prev, " | ", curr])}
                </p>
                <h2>Base Stats</h2>
                <ul>
                  {pokemon.stats.map(stat => (
                    <li key={stat.stat.name}>{`${this.capitalize(
                      stat.stat.name
                    )}: ${stat.base_stat}`}</li>
                  ))}
                </ul>
              </div>
              <h2 className="moveset-text">Moveset</h2>
            </div>
            <div className="move-results">
              {pokemon.moves
                .sort((a, b) => {
                  if (a.move.name < b.move.name) return -1;
                  if (a.move.name > b.move.name) return 1;
                  return 0;
                })
                .map(move => (
                  <div key={move.move.name}>
                    <Link to={`/move/${move.move.name}`}>
                      {this.capitalize(move.move.name)}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Pokemon;
