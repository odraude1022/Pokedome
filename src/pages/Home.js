import React from 'react'
import Navbar from '../components/Navbar'
import './Home.css'
import Pikachu from './pikachu_waving.gif'
import Poke from './Pokeball.svg'
import Unknown from './unknown.gif'



const Home = () => {
  return(

    <React.Fragment>

    <div id="navbars">
      <div id='pokeball1'>
        <img id="Ball" src={ Poke } alt="location" height="90" width="90" />
      </div>
      <div id='navbar'>
        <Navbar/>
      </div>
      <div id='pokeball2'>
        <img id="Ball2" src={ Poke } alt="location" height="90" width="90" />
      </div>
    </div>
    <div id='title'>
      <h1 className='blinker'>Welcome to Poke Dome!</h1>
    </div>
<div class='info'>
  <div id="left">
    <p>Are you new to Pokemon?!
      This is the website for you!
      Here at Poke Dome we offer
      Pokemon information by filtering them
      by Name, type and moves!
      </p>
  </div>

    <div id="center">
      <p>Did you know?</p>
      <img id="unknown" src={ Unknown } alt="unknown"/>
      <p>The Pokemon franchise is the HIGHEST-Grossing entertainment franchise of all time!!!
      Since it’s creation in 1996 Pokemon is estimated to be worth $59.1 billion!
      Pokemon beats the Star Wars franchise that falls short grossing $49.5 billion!
      Pokemon Go! came out on July 2016 and had users walk around areas to creating the illustion
      That users were able to catch their own pokemon!</p>
  </div>
</div>

<div id="img-wrapper">
  <img id="Pikachu" src={ Pikachu } alt="pikachu" height="250" width="330"/>
</div>

    </React.Fragment>
  )
}

export default Home
