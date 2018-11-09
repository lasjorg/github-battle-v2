import React, { Component } from 'react';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';
import Popular from './Popular';
import Nav from './Nav';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route path="/popular" component={Popular} />
            <Route render={() => <p>Life's what you make it</p>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
