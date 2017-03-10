import React, { Component } from 'react';

import Nav from '../nav/Nav';

import './App.css';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Nav />
                {this.props.children}
            </div>
        );
    }
};

export default App;
