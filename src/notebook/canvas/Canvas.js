import React, { Component } from 'react';


class Canvas extends Component {
    componentDidMount() {
        // this.initWebGL();
        // this.start();
    }

    initWebGL = () => {
        this.gl = null;
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    }

    start = () => {
        // Set clear color to black, fully opaque
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // Enable depth testing
        this.gl.enable(this.gl.DEPTH_TEST);
        // Near things obscure far things
        this.gl.depthFunc(this.gl.LEQUAL);
        // Clear the color as well as the depth buffer
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Adjust GL viewport to full size of canvas
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        return (
            <canvas
                ref={el => { this.canvas = el; }}
                id="glCanvas"
                width="640"
                height="480"
            />
        );
    }
}

export default Canvas;
