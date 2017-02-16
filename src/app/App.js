import React, { Component } from 'react';
import Nav from '../nav/Nav';

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <p className="App-intro">
          <a className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>button</a>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
