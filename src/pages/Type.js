import React from 'react'
import Navbar from '../components/Navbar'
import Poke from './Pokeball.svg'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import './Type.css'
import Normal from './normal_icon.jpg'
import Bug from './bug_icon.jpg'
import Dark from './dark_icon.jpg'
import Dragon from './dragon_icon.jpg'
import Electric from './electric_icon.jpg'
import Fairy from './fairy_icon.jpg'
import Fighting from './fighting_icon.jpg'
import Fire from './fire_icon.jpg'
import Flying from './flying_icon.jpg'
import Ghost from './ghost_icon.jpg'
import Grass from './grass_icon.jpg'
import Ground from './ground_icon.jpg'
import Ice from './ice_icon.jpg'
import Poison from './poison_icon.jpg'
import Psychic from './psychic_icon.jpg'
import Steel from './steel_icon.jpg'
import Rock from './rock_icon.jpg'
import Water from './water_icon.jpg'

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
        <div id="navbars">
          <div id='pokeball1'>
            <img id="Ball" src={Poke} alt="location" height="90" width="90" />
          </div>
          <div id='navbar'>
            <Navbar />
          </div>
          <div id='pokeball2'>
            <img id="Ball2" src={Poke} alt="location" height="90" width="90" />
          </div>
        </div>
        <h1>Search Type!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="search"
            value={this.state.query}
            onChange={this.handleInput}
          />
        </form>

        <div id="type_icons">
      <img id="Normal" src={ Normal } alt="normal"  />
      <img id="Bug" src={ Bug } alt="bug" />
      <img id="Dark" src={ Dark } alt="dark" />
      <img id="Dragon" src={ Dragon } alt="dragon" />
      <img id="Electric" src={ Electric } alt="electric"  />
      <img id="Fairy" src={ Fairy } alt="fairy" />
      <img id="Fighting" src={ Fighting } alt="fighting" />
      <img id="Fire" src={ Fire } alt="fighting"  />
      <img id="Flying" src={ Flying } alt="flying" />
      <img id="Ghost" src={ Ghost } alt="ghost" />
      <img id="Grass" src={ Grass } alt="grass"  />
      <img id="Ground" src={ Ground } alt="ground" />
     <img id="Ice" src={ Ice } alt="ice" />
     <img id="Poison" src={ Poison } alt="poison" />
      <img id="Psychic" src={ Psychic } alt="psychic" />
     <img id="Steel" src={ Steel } alt="steel" />
      <img id="Rock" src={ Rock } alt="rock" />
      <img id="Water" src={ Water } alt="water" />
</div>

        {this.state.name && <h1>{this.capitalize(this.state.name)} </h1>}
        {this.state.moves && <div>
          <div className='poke-center'>
          <h2 className='moveset-text'>Pokemon:</h2>
          </div>
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
