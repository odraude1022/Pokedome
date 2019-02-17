import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Type from './pages/Type'
import Name from './pages/Name'
import Move from './pages/Move'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path='/type' component={Type}/>
            <Route exact path='/name' component={Name}/>
            <Route exact path='/move/:move' component={Move}/>
          </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
