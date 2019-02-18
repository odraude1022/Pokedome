import React from 'react'
import Navbar from '../components/Navbar'
import App from '../App'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

class Type extends React.Component {
  state = { error: null, 
            name: null, 
            damage_relations: null, 
            game_indices: null,
            pokemon: null || {}, 
            query: '',
            moves: null,
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



  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/type/${this.state.query}`)
      .then(res => res.json())
      .then(
        (result) => {
          
          this.setState({
            name: result.name,
            damage_relations: result.damage_relations,
            game_indices: result.game_indices,
            moves: result.moves,
            pokemon: result.pokemon
          });
          console.log(result)
        }
      ).catch(error => {
        this.setState({
          name: "Not Found",
          pokemon: null,
          moves: null,

        });
      })
  }
  render() {
    const {name, damage_relations, game_indices, moves, pokemon} = this.state;
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
        {this.state.moves && <div className='results'>
          
          <h2>Pokemon:</h2>
          <ul>
          {pokemon.map(mon => (
            <li>{this.capitalize(mon.pokemon.name)}</li>
          ))}
          </ul>
          <h2>Moves:</h2>
          <ul>
          {moves.map(move => (
            <li>{this.capitalize(move.name)}</li>
            ))}
          </ul>
          
        </div>}
      </div>
    )
  }
}

export default Type;
