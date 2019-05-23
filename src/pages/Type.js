import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "./Type.css";
import Loader from "../components/Type/Loader"
import Buttons from "../components//Type/Buttons"

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

  handleFetch = type => {
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          name: result.name,
          damage_relations: result.damage_relations,
          game_indices: result.game_indices,
          moves: result.moves,
          pokemon: result.pokemon,
          sprites: []
        });
      })
      .then(res => {
        let pokemon = this.state.pokemon;
        let length = pokemon.length;
        let i = 0;
        pokemon.map(mon => {
          const name = mon.pokemon.name;
          let sprites = this.state.sprites;
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            .then(res => res.json())
            .then(result => sprites.push(result))
            .then(result2 => {
              this.setState({ sprites });
              i++;
              if (i === length) {
                sprites = sprites.sort((a, b) => {
                  let ida = a.id;
                  let idb = b.id;
                  if (ida < idb) return -1;
                  if (ida > idb) return 1;
                  return 0;
                });
                this.setState({ isLoaded: true, sprites });
              }
            });
        });
      })
      .catch(error => {
        this.setState({
          name: "",
          pokemon: null,
          moves: null,
          sprites: [],
          isLoaded: true,
          loading: false
        });
      });
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
            <div className="results">
              {sprites.map(sprite => {
                return (
                  <div className="result" key={sprite.name}>
                    <Link to={`/pokemon/${sprite.name}`}>
                      {this.capitalize(sprite.name)}
                      {sprite.sprites.front_default && (
                        <img
                          className="spriter"
                          src={sprite.sprites.front_default}
                          alt="test"
                        />
                      )}
                    </Link>
                  </div>
                );
              })}{" "}
            </div>
            <h2>Moves:</h2>
            <div className="move-results">
              {moves
                .sort((a, b) => {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                })
                .map(move => (
                  <div key={move.name}>
                    <Link to={`/move/${move.name}`}>
                      {this.capitalize(move.name)}
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

export default Type;
