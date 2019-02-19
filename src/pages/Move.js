import React from 'react'
import Navbar from '../components/Navbar'
import Poke from './Pokeball.svg'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

class Move extends React.Component {
  state = {
    query: '',
    move: null,
    effect_chance: null,
    name: null,
    type: null,
    accuracy: null,
    damage_class: null,
    effect: null,
    power: null,
    pp: null}

  componentDidMount() {
    const move = this.props.match.params.move
    fetch(`https://pokeapi.co/api/v2/move/${move}`)
    .then(res => res.json())
    .then(result => {
      this.setState({
        move: result,
        name: result.name,
        type: result.type.name,
        accuracy: result.accuracy,
        damage_class: result.damage_class.name,
        effect: result.effect_entries[0].effect.replace('$effect_chance', result.effect_chance),
        effect_chance: result.effect_chance,
        power: result.power,
        pp: result.pp,
        query: ''
      })

    }).catch(error => {
      this.setState({
        move: null,
        name: '',
        type: null,
        accuracy: null,
        damage_class: null,
        effect: null,
        power: null,
        pp: null,
        query: ''})
    })

  }

  capitalize = (string) => {
    return string
    .split('-')
    .map(string => {return string[0].toUpperCase() + string.substring(1, string.length)})
    .join('-');
  }
  handleInput = event => {
    this.setState({query: event.target.value.toLowerCase()})
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/move/${this.state.query}`)
    .then(res => res.json())
    .then(result => {
      this.setState({
        move: result,
        name: result.name,
        type: result.type.name,
        accuracy: result.accuracy,
        damage_class: result.damage_class.name,
        effect: result.effect_entries[0].effect.replace('$effect_chance', result.effect_chance),
        effect_chance: result.effect_chance,
        power: result.power,
        pp: result.pp,
        query: ''
      })

    }).catch(error => {
      this.setState({
        move: null,
        name: 'Not Found',
        type: null,
        accuracy: null,
        damage_class: null,
        effect: null,
        power: null,
        pp: null,
        query: ''})
    })
  }

  render() {
    console.log(this.props.match.params.move)
    const {move, name, accuracy, damage_class, effect, power, pp} = this.state;
    return(
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
        <h1>Search Moves!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
          type="search"
          value={this.state.query}
          onChange={this.handleInput}
          />
        </form>
        {this.state.name && <h1>{this.capitalize(this.state.name)} </h1>}
        {this.state.move && <div className='name-results'>
          <div className='name-result'>
          <p>Type: <Link to={`/type/${this.state.type}`}>{this.capitalize(this.state.type)}</Link></p>
          <p>Power: {this.state.power}</p>
          <p>Accuracy: {this.state.accuracy}</p>
          <p>Max PP: {this.state.pp}</p>
          <p>Category: {this.capitalize(this.state.damage_class)}</p>
          <p>Effect: {this.state.effect}</p>
          </div>
        </div>}
      </div>
    )
  }


}


export default Move
