import React, { Component } from 'react';

import Nav from '../nav/Nav';

import './App.css';


const App = React.createClass({
    render() {
        return (
            <div>
                <Nav />
                {this.props.children}
            </div>
        );
    }
});

export default App;
