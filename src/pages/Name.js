import React from 'react'
import Navbar from '../components/Navbar'
import App from '../App'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class Name extends React.Component {
  state = {error: null, name: null, types: null, stats: null , moves: null, pokemon: this.props.pokemon || {}, query: ''}

  capitalize = (string) => {
    return string
    .split('-')
    .map(string => {return string[0].toUpperCase() + string.substring(1, string.length)})
    .join('-');
  }


  handleInput = event => {
    this.setState({query: event.target.value.toLowerCase()})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.query}`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            pokemon: result,
            name: result.name,
            types: result.types,
            stats: result.stats,
            moves: result.moves
          });
        }
      ).catch(error => {
        this.setState({
          pokemon: {},
          name: 'Not Found',
          error: error,
          types: null,
          stats: null,
          moves: null});
      })
      console.log(this.state.pokemon);
  }
  render() {
  const { pokemon } = this.state;
      return (
        <div>
          <Navbar/>
          <h1>Search Pokemon By Name!</h1>
          <form onSubmit={this.handleSubmit}>
            <input
            type="search"
            value={this.state.query}
            onChange={this.handleInput}
            />
          </form>
          {this.state.name && <h1>{this.capitalize(this.state.name)} </h1>}
          {Object.keys(pokemon).length > 0  && <div className='results'>
            <img
            src={this.state.pokemon.sprites.front_default}
            alt='sprite of pokemon from the front'/>
            <img
            src={this.state.pokemon.sprites.back_default}
            alt='sprite of pokemon from the back'/>
            <p>Type: {pokemon.types.map( type => (
                <a key={type.type.name}> {this.capitalize(type.type.name)} </a>
            ))}</p>
            {/*Link to Type page*/}
            <h2>Base Stats</h2>
            <ul>
              {pokemon.stats.map(stat => (
                <li key={stat.stat.name}>{`${this.capitalize(stat.stat.name)}: ${stat.base_stat}`}</li>
              ))}
            </ul>
            <h2>Moveset</h2>
            <ul>
              {pokemon.moves.map(move => (
                <li key={move.move.name}>{this.capitalize(move.move.name)}</li>
              ))}
            </ul>
          </div>}
        </div>
      )
  }
}

export default Name;
