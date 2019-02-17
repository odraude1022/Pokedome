import React from 'react'
import Navbar from '../components/Navbar'
import App from '../App'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

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
        pp: result.pp
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
        pp: null})
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
        pp: result.pp
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
        pp: null})
    })
  }

  render() {
    console.log(this.props.match.params.move)
    const {move, name, accuracy, damage_class, effect_entries, power, pp} = this.state;
    return(
      <div>
        <Navbar/>
        <h1>Search Moves!</h1>
        <form onSubmit={this.handleSubmit}>
          <input
          type="search"
          value={this.state.query}
          onChange={this.handleInput}
          />
        </form>
        {this.state.name && <h1>{this.capitalize(this.state.name)} </h1>}
        {this.state.move && <div className='results'>
          <p>Type: {this.capitalize(this.state.type)}</p>
          <p>Power: {this.state.power}</p>
          <p>Accuracy: {this.state.accuracy}</p>
          <p>Max PP: {this.state.pp}</p>
          <p>Category: {this.state.damage_class}</p>
          <p>Effect: {this.state.effect}</p>

        </div>}
      </div>
    )
  }


}


export default Move
