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

        <div id="type_icons">
          <Link to={`/type/normal`}>
            <img
              className="type_icon"
              src="/images/types/normal_icon.jpg"
              onClick={() => this.handleParameter("normal")}
              alt="normal"
            />
          </Link>
          <Link to={`/type/bug`}>
            <img
              className="type_icon"
              src="/images/types/bug_icon.jpg"
              onClick={() => this.handleParameter("bug")}
              alt="bug"
            />
          </Link>
          <Link to={`/type/dark`}>
            <img
              className="type_icon"
              src="/images/types/dark_icon.jpg"
              onClick={() => this.handleParameter("dark")}
              alt="dark"
            />
          </Link>
          <Link to={`/type/dragon`}>
            <img
              className="type_icon"
              src="/images/types/dragon_icon.jpg"
              onClick={() => this.handleParameter("dragon")}
              alt="dragon"
            />
          </Link>
          <Link to={`/type/electric`}>
            <img
              className="type_icon"
              src="/images/types/electric_icon.jpg"
              onClick={() => this.handleParameter("electric")}
              alt="electric"
            />
          </Link>
          <Link to={`/type/fairy`}>
            <img
              className="type_icon"
              src="/images/types/fairy_icon.jpg"
              onClick={() => this.handleParameter("fairy")}
              alt="fairy"
            />
          </Link>
          <Link to={`/type/fighting`}>
            <img
              className="type_icon"
              src="/images/types/fighting_icon.jpg"
              onClick={() => this.handleParameter("fighting")}
              alt="fighting"
            />
          </Link>
          <Link to={`/type/fire`}>
            <img
              className="type_icon"
              src="/images/types/fire_icon.jpg"
              onClick={() => this.handleParameter("fire")}
              alt="fighting"
            />
          </Link>
          <Link to={`/type/flying`}>
            <img
              className="type_icon"
              src="/images/types/flying_icon.jpg"
              onClick={() => this.handleParameter("flying")}
              alt="flying"
            />
          </Link>
          <Link to={`/type/ghost`}>
            <img
              className="type_icon"
              src="/images/types/ghost_icon.jpg"
              onClick={() => this.handleParameter("ghost")}
              alt="ghost"
            />
          </Link>
          <Link to={`/type/grass`}>
            <img
              className="type_icon"
              src="/images/types/grass_icon.jpg"
              onClick={() => this.handleParameter("grass")}
              alt="grass"
            />
          </Link>
          <Link to={`/type/ground`}>
            <img
              className="type_icon"
              src="/images/types/ground_icon.jpg"
              onClick={() => this.handleParameter("ground")}
              alt="ground"
            />
          </Link>
          <Link to={`/type/ice`}>
            <img
              className="type_icon"
              src="/images/types/ice_icon.jpg"
              onClick={() => this.handleParameter("ice")}
              alt="ice"
            />
          </Link>
          <Link to={`/type/poison`}>
            <img
              className="type_icon"
              src="/images/types/poison_icon.jpg"
              onClick={() => this.handleParameter("poison")}
              alt="poison"
            />
          </Link>
          <Link to={`/type/psychic`}>
            <img
              className="type_icon"
              src="/images/types/psychic_icon.jpg"
              onClick={() => this.handleParameter("psychic")}
              alt="psychic"
            />
          </Link>
          <Link to={`/type/steel`}>
            <img
              className="type_icon"
              src="/images/types/steel_icon.jpg"
              onClick={() => this.handleParameter("steel")}
              alt="steel"
            />
          </Link>
          <Link to={`/type/rock`}>
            <img
              className="type_icon"
              src="/images/types/rock_icon.jpg"
              onClick={() => this.handleParameter("rock")}
              alt="rock"
            />
          </Link>
          <Link to={`/type/water`}>
            <img
              className="type_icon"
              src="/images/types/water_icon.jpg"
              onClick={() => this.handleParameter("water")}
              alt="water"
            />
          </Link>
        </div>

        {name && <h1>{this.capitalize(name)} </h1>}
        {this.state.moves && (
          <div>
            <div className="poke-center">
              <h2 className="moveset-text">Pokemon:</h2>
            </div>
            <div className="results">
              {sprites.map((sprite, i) => {
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
