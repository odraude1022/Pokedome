import React from 'react'
import Navbar from '../components/Navbar'
import './Home.css'
import Pikachu from './pikachu_waving.gif'
import Poke from './Pokeball.svg'
import Unknown from './unknown.gif'
import Pokemongo from './pokemongo.gif'



const Home = () => {
  return(

    <div>

    <div id="navbars">

    <div class="ball1">
      <img id="Ball" src={ Poke } alt="location" height="150" width="90" />
    </div>

      <Navbar/>

      <div class="ball2">
        <img id="Ball2" src={ Poke } alt="location" height="150" width="90" />
      </div>

  </div>

      <h1>Welcome to Poke Dome!</h1>


<div id="left">

      <div id="intro">
      <div class="paragraph">
      <p>Are you new to Pokemon?! </p>
      <p>This is the website for you!</p>
      </div>
    </div>

    <div id="secondary">
    <div class="statement">
    <p>Here at Poke Dome we offer</p>
    <p>Pokemon information by filtering them </p>
    <p>by Name, type and moves!</p>
    </div>
  </div>

  </div>


  <div id="center">
    <div class="pokefacts">
    <p>Did you know?</p>
    <img id="unknown" src={ Unknown } alt="unknown"/>
    <p>The Pokemon franchise is the HIGHEST-Grossing entertainment franchise of all time!!!</p>
    <p>Since it’s creation in 1996 Pokemon is estimated to be worth $59.1 billion!</p>
    <p>Pokemon beats the Star Wars franchise that falls short grossing $49.5 billion!</p>
    <p>Pokemon Go! came out on July 2016 and had users walk around areas to creating the illustion</p>
    <p>That users were able to catch their own pokemon!</p>
  </div>
</div>



      <div id="img-wrapper1">
        <img id="Pikachu" src={ Pikachu } alt="pikachu" height="250" width="330"/>
      </div>

    </div>
  )
}

export default Home
