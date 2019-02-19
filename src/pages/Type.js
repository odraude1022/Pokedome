import React from 'react'
import Navbar from '../components/Navbar'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

class Type extends React.Component {
  state = { error: null,
            name: null,
            damage_relations: null,
            game_indices: null,
            pokemon: null || {},
            query: '',
            moves: null,
            isLoaded: false,
            sprites: []
          }

  componentDidMount() {
    const type = this.props.match.params.type
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            name: result.name,
            damage_relations: result.damage_relations,
            game_indices: result.game_indices,
            moves: result.moves,
            pokemon: result.pokemon,
            sprites: []
          });
        }
      )
      .then( res => {
        let pokemon = this.state.pokemon
        let length = pokemon.length;
        let i = 0;
        pokemon.map( mon => {
          const name = mon.pokemon.name
          let sprites = this.state.sprites
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`).then(res => res.json()).then(result => sprites.push(result))
          .then( result2 => {
            sprites = sprites.sort((a,b) => {
              let ida = a.id;
              let idb = b.id;
              if(ida < idb) return -1;
              if(ida > idb) return 1;
              return 0;
            });
            this.setState({sprites})
            i++;
            if(i === length)
            {
              this.setState({isLoaded: true})
            }
          }

          )
        })
      }).catch(error => {
        this.setState({
          name: "",
          pokemon: null,
          moves: null,
          sprites: [],
          isLoaded: true

        });
      })
  }


  capitalize = (string) => {
    string = string.replace('--', '-');
    return string
      .split('-')
      .map(string => { return string[0].toUpperCase() + string.substring(1, string.length) })
      .join('-');
  }
  handleInput = event => {
    this.setState({ query: event.target.value.toLowerCase() })
  }


  getPokemon = (string) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${string}`)
    .then(res => res.json())
    .then(res => {
      return res.sprites.front_default})
  }

  // fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`).then(res => res.json()).then(result => this.setState({ sprites: result.sprites.front_default }))
  // const name = mon.pokemon.name

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({isLoaded: false});
    fetch(`https://pokeapi.co/api/v2/type/${this.state.query}`)
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            name: result.name,
            damage_relations: result.damage_relations,
            game_indices: result.game_indices,
            moves: result.moves,
            pokemon: result.pokemon,
            sprites: [],
            isLoaded: false
          });
        }
      )
      .then( res => {
        let pokemon = this.state.pokemon
        let length = pokemon.length;
        let i = 0;
        console.log(length)
        pokemon.map( mon => {
          console.log(this.state.isLoaded)
          const name = mon.pokemon.name
          let sprites = this.state.sprites
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`).then(res => res.json()).then(result => {
             sprites.push(result)
           })
          .then( result2 => {
            sprites = sprites.sort((a,b) => {
              let ida = a.id;
              let idb = b.id;
              if(ida < idb) return -1;
              if(ida > idb) return 1;
              return 0;
            });
            console.log(this.state.isLoaded)
            this.setState({sprites})
            i++;
            console.log(i)
            if(i == length)
            {
              this.setState({isLoaded: true});
            }
          }

          )
        })
      }).catch(error => {
        this.setState({
          name: "Not Found",
          pokemon: null,
          moves: null,
          sprites: [],
          isLoaded: true

        });
      })
  }
  render() {
    const {name, damage_relations, game_indices, moves, pokemon, sprites, isLoaded} = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Navbar />
        <h1>Search Type!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="search"
            value={this.state.query}
            onChange={this.handleInput}
          />
        </form>
        {this.state.name && <h1>{this.capitalize(this.state.name)} </h1>}
        {this.state.moves && <div>

          <h2>Pokemon:</h2>
          <div className='results'>
          {this.state.sprites.map((sprite, i) => {
            return <div className='result' key={sprite.name}><Link to={`/name/${sprite.name}`}>{sprite.name}
            <img width='200px'src={sprite.sprites.front_default} alt="test" /></Link></div>
          })} </div>
          <h2>Moves:</h2>
          <div className='move-results'>
            {moves.map(move => (
              <div key={move.name}><Link to={`/move/${move.name}`}>{this.capitalize(move.name)}</Link></div>
              ))}
          </div>
        </div>}
      </div>
    )
  }
}

export default Type;
