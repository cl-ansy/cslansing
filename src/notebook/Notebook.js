import React, { Component } from 'react';

import Canvas from './canvas/Canvas';

import './Notebook.css';


class Notebook extends Component {
    render() {
        return (
            <div className="notebook-container">
                <Canvas />
            </div>
        );
    }
}

export default Notebook;
