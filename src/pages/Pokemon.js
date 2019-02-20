import React from 'react'
import Navbar from '../components/Navbar'
import './Name.css'
import Poke from './Images/Pokeball.svg'
import { Link } from 'react-router-dom'

class Pokemon extends React.Component {
  state = {error: null, name: null, types: null, stats: null , moves: null, pokemon: this.props.pokemon || {}, query: ''}

  componentDidMount() {
    const name = this.props.match.params.name
    this.handleFetch(name);
  }

  handleFetch = (name) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            pokemon: result,
            name: result.name,
            types: result.types,
            stats: result.stats,
            moves: result.moves,
            query: ''
          });
        }
      ).catch(error => {
        this.setState({
          pokemon: {},
          name: this.state.query ? 'Not Found' : '',
          error: error,
          types: null,
          stats: null,
          moves: null,
          query: ''});
      })
  }

  capitalize = (string) => {
    return string
    .split('-')
    .map(string => {return string[0].toUpperCase() + string.substring(1, string.length)})
    .join('-');
  }


  handleInput = event => {
    this.setState({query: event.target.value
                          .toLowerCase()
                          .replace('#', '')
                          .replace('.', '')
                          .replace('?', '')})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(!this.state.query)
    {
      return
    }
    this.handleFetch(this.state.query);
  }
  render() {
  const { pokemon } = this.state;
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
          <h1>Search Pokemon By Name!</h1>
          <form onSubmit={this.handleSubmit}>
            <input
            type="search"
            value={this.state.query}
            onChange={this.handleInput}
            />
          </form>
          {this.state.pokemon.id && this.state.name && <h1>#{this.state.pokemon.id}: {this.capitalize(this.state.name)} </h1>}
          {!this.state.pokemon.id && this.state.name && <h1>{this.capitalize(this.state.name)}</h1>}
          {Object.keys(pokemon).length > 0  && <div>
            <div className='name-results'>
              <div className='name-result'>
                <div className='spritez'>
                {this.state.pokemon.sprites.front_default && <img
                width='150px'
                src={this.state.pokemon.sprites.front_default}
                alt='sprite of pokemon from the front'/>}
                {this.state.pokemon.sprites.back_default && <img
                width='150px'
                src={this.state.pokemon.sprites.back_default}
                alt='sprite of pokemon from the back'/>}
                </div>
              <p>
                Type:
                {
                  pokemon.types.map( type => (
                    <Link key={type.type.name} to={`/type/${type.type.name}`}>
                      {this.capitalize(type.type.name)}
                    </Link>
                  )).reduce((prev, curr) => [prev, ' | ', curr])
                }
              </p>
              <h2>Base Stats</h2>
              <ul>
                {pokemon.stats.map(stat => (
                  <li key={stat.stat.name}>{`${this.capitalize(stat.stat.name)}: ${stat.base_stat}`}</li>
                ))}
              </ul>
              </div>
              <h2 className='moveset-text'>Moveset</h2>
            </div>
            <div className='move-results'>
              {pokemon.moves
                .sort( (a,b) => {
                  if(a.move.name < b.move.name) return -1
                  if(a.move.name > b.move.name) return 1
                  return 0
                })
                .map(move => (
                <div key={move.move.name}><Link to={`/move/${move.move.name}`}>{this.capitalize(move.move.name)}</Link></div>
              ))}
            </div>
          </div>}
        </div>
      )
  }
}

export default Pokemon;
