import React from "react";
import axios from 'axios'
import Navbar from "../components/Navbar";
import "./Name.css";
import SearchBox from "../components/Pokemon/SearchBox"
import Info from "../components/Pokemon/Info"


let pokemonNames = [];
axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=964`)
  .then(res => {
    res.data.results.forEach(mon => {
      pokemonNames.push(mon.name);
    });
  });

class Pokemon extends React.Component {
  state = {
    name: null,
    pokemon: this.props.pokemon || {},
    query: "",
    suggestions: []
  };

  componentDidMount() {
    const name = this.props.match.params.name;
    this.handleFetch(name);
  }

  handleFetch = async name => {
    try {
      const result = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)).data
      this.setState({
        pokemon: result,
        name: result.name,
        query: "",
        suggestions: []
      });
    }
    catch(error) {
      this.setState({
            pokemon: {},
            name: this.state.query ? "Not Found" : "",
            query: "",
            suggestions: []
      });
    }
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
    const { pokemon, name } = this.state;
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

        {pokemon.id && name && (
          <h1>
            #{pokemon.id}: {this.capitalize(name)}{" "}
          </h1>
        )}

        {/*some pokemon do not have an id so we just display the name*/}

        {!pokemon.id && name && (
          <h1>{this.capitalize(name)}</h1>
        )}
        <Info pokemon={pokemon} capitalize={this.capitalize}/>
      </div>
    );
  }
}

export default Pokemon;
