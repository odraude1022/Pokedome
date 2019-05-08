import React from "react";
import Navbar from "../components/Navbar";
import "./Name.css";
import { Link } from "react-router-dom";
import SearchBox from "../components/Pokemon/SearchBox"
import Info from "../components/Pokemon/Info"


let pokemonNames = [];
fetch(`https://pokeapi.co/api/v2/pokemon/?limit=964`)
  .then(res => res.json())
  .then(res => {
    res.results.forEach(mon => {
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
        <SearchBox
          handleSubmit={this.handleSubmit}
          query={this.state.query}
          handleInput={this.handleInput}
          suggestions={this.state.suggestions}
          handleFetch={this.handleFetch}
        />

        {this.state.pokemon.id && this.state.name && (
          <h1>
            #{this.state.pokemon.id}: {this.capitalize(this.state.name)}{" "}
          </h1>
        )}

        {/*some pokemon do not have an id so we just display the name*/}

        {!this.state.pokemon.id && this.state.name && (
          <h1>{this.capitalize(this.state.name)}</h1>
        )}
        <Info pokemon={this.state.pokemon} capitalize={this.capitalize}/>
      </div>
    );
  }
}

export default Pokemon;
