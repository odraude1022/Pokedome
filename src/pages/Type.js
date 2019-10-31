import React from "react";
import Navbar from "../components/Navbar";
import "./Type.css";
import Loader from "../components/Type/Loader"
import Buttons from "../components/Type/Buttons"
import PokemonResults from "../components/Type/PokemonResults"
import MoveResults from "../components/Type/MoveResults"
import axios from 'axios'

class Type extends React.Component {
  state = {
    error: null,
    name: null,
    damage_relations: null,
    game_indices: null,
    pokemon: null || {},
    query: "",
    moves: null,
    isLoaded: false,
    sprites: [],
    loading: true
  };

  componentDidMount() {
    const type = this.props.match.params.type;
    if (type === "search") {
      this.setState({ isLoaded: true });
    } else {
      this.handleFetch(type);
    }
  }

  handleFetch = async type => {
    const result = (await axios.get(`https://pokeapi.co/api/v2/type/${type}`)).data
    const {name, damage_relations, game_indices, moves, pokemon} = result
    let sprites = await Promise.all(pokemon.map(async mon => {
      return (await axios.get(`https://pokeapi.co/api/v2/pokemon/${mon.pokemon.name}`)).data
    }))
    sprites = sprites.sort((a, b) => {
      return a.id - b.id
    });
    this.setState({name, damage_relations, game_indices, moves, pokemon, sprites, isLoaded: true });
    
  };

  capitalize = string => {
    string = string.replace("--", "-");
    return string
      .split("-")
      .map(string => {
        return string[0].toUpperCase() + string.substring(1, string.length);
      })
      .join("-");
  };
  handleInput = event => {
    this.setState({ query: event.target.value.toLowerCase() });
  };

  handleParameter = type => {
    this.setState({ isLoaded: false });
    this.handleFetch(type);
  };

  render() {
    const { name, moves, sprites, isLoaded } = this.state;
    if (!isLoaded) {
      return <Loader loading={this.state.loading}/>
    }
    return (
      <div>
        <Navbar />
        <h1>Search Type!</h1>
        <Buttons handleParameter={this.handleParameter}/>

        {name && <h1>{this.capitalize(name)} </h1>}
        {this.state.moves && (
          <div>
            <div className="poke-center">
              <h2 className="moveset-text">Pokemon:</h2>
            </div>
            <PokemonResults sprites={sprites} capitalize={this.capitalize}/>
            <div className="poke-center">
              <h2 className="moveset-text">Moves:</h2>
            </div>
            <MoveResults moves={moves} capitalize={this.capitalize}/>
          </div>
        )}
      </div>
    );
  }
}

export default Type;
