import React, { Component } from 'react';

import Canvas from './canvas/Canvas';

import './Notebook.css';


class Notebook extends Component {
    render() {
        return (
            <div className="Notebook">
                <Canvas />
            </div>
        );
    }
}

export default Notebook;
