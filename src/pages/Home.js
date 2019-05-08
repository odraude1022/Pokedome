import React from "react";
import Navbar from "../components/Navbar";
import "./Home.css";

const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div id="title">
        <h1 className="blinker">Welcome to Poke Dome!</h1>
      </div>
      <div className="info">
        <div id="left">
          <p>
            Are you new to Pokemon?! This is the website for you! Here at PokeDome,
            we offer Pokemon information by filtering them by Name, type,
            and moves!
          </p>
        </div>

        <div id="center">
          <p>Did you know?</p>
          <img id="unknown" src="/images/unknown.gif" alt="unknown" />
          <p>
            The Pokemon franchise is the Highest-Grossing entertainment
            franchise of all time! Since its creation in 1996, Pokemon is
            estimated to have earned more $90 billion! Pokemon beats the Star Wars
            franchise that falls short grossing $65 billion! Pokemon Go! came
            out on July 2016 and had users walk around areas to create the
            illustion that users were able to catch their own pokemon!
          </p>
        </div>
      </div>

      <div id="img-wrapper">
        <img
          id="Pikachu"
          src="/images/pikachu_waving.gif"
          alt="pikachu"
          height="250"
          width="330"
        />
      </div>
    </React.Fragment>
  );
};

export default Home;
