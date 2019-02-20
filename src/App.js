import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Type from './pages/Type'
import Pokemon from './pages/Pokemon'
import Move from './pages/Move'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path='/type/:type' component={Type}/>
            <Route path='/pokemon/:name' component={Pokemon}/>
            <Route path='/move/:move' component={Move}/>
          </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
