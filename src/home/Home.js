import React, { Component } from 'react';

import './Home.css';


class Home extends Component {
    render() {
        return (
            <div className="Home">
                <p className="Home-intro">
                    <a className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>button</a>
                    To get started, edit <code>src/Home.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default Home;
