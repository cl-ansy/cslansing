import React, { Component } from 'react';
import * as PIXI from 'pixi.js';

const maxRes = {
    x: 1024,
    y: 768
};
const WIDTH = Math.min(maxRes.x, window.innerWidth);
const HEIGHT = Math.min(maxRes.y, window.innerHeight);
// const ASSETS_URL = `${process.env.PUBLIC_URL}/assets/`;

class Canvas extends Component {
    componentDidMount() {
        this.createStage();
        this.createRenderer();
        this.loadTextures(this.start);
    }

    createStage() {
        this.stage = new PIXI.Container();
    }

    createRenderer() {
        let renderer = this.renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
        renderer.backgroundColor = 0x111111;
        renderer.view.style.position = 'absolute';
        renderer.view.style.display = 'block';
        renderer.autoResize = true;
        this.container.appendChild(renderer.view);
    }

    loadTextures(loadCb) {
        return loadCb();

        // const assets = [
        // `${ASSETS_URL}images/cat.png`
        // ];

        // const progressCb = loadHandler => {
        //     console.log(`Progress: ${loader.progress}%`);
        // }

        // PIXI.loader
        //     .add(assets)
        //     .on('progress', progressCb)
        //     .load(loadCb);
    }

    start = () => {
        // this.cat = new PIXI.Sprite(
        //     PIXI.loader.resources[`${ASSETS_URL}images/cat.png`].texture
        // );
        // this.stage.addChild(this.cat);

        this.renderer.render(this.stage);
        requestAnimationFrame(this.update);
    }

    update = () => {
        this.renderer.render(this.stage);
        this.frame = requestAnimationFrame(this.update);
    }

    controls() {
        const left = this.keyboard(37);
        const up = this.keyboard(38);
        const right = this.keyboard(39);
        const down = this.keyboard(40);

        left.press = () => { this.cat.vx = -5; this.cat.vy = 0; };
        left.release = () => {
            if (!right.isDown && this.cat.vy === 0) {
                this.cat.vx = 0;
            }
        }

        up.press = () => { this.cat.vx = 0; this.cat.vy = -5; };
        up.release = () => {
            if (!down.isDown && this.cat.vx === 0) {
                this.cat.vy = 0;
            }
        }

        right.press = () => { this.cat.vx = 5; this.cat.vy = 0; };
        right.release = () => {
            if (!left.isDown && this.cat.vy === 0) {
                this.cat.vx = 0;
            }
        }

        down.press = () => { this.cat.vx = 0; this.cat.vy = 5; };
        down.release = () => {
            if (!up.isDown && this.cat.vx === 0) {
                this.cat.vy = 0;
            }
        }
    }

    keyboard(keyCode) {
        let key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;

        key.downHandler = event => {
            if (event.keyCode === key.code) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
            }
            event.preventDefault();
        }

        key.upHandler = event => {
            if (event.keyCode === key.code) {
                if (key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = false;
            }
            event.preventDefault();
        }

        window.addEventListener(
            'keydown', key.downHandler.bind(key), false
        );
        window.addEventListener(
            'keyup', key.upHandler.bind(key), false
        );

        return key;
    }

    render() {
        return (
            <div
                ref={el => { this.container = el; }}
                className="PIXI-container"
                width={WIDTH}
                height={HEIGHT}
                onMouseDown={this.handleMouseDown.bind(this)}
                onMouseMove={this.handleMouseMove.bind(this)}
                onMouseUp={this.handleMouseUp.bind(this)}
            />
        );
    }

    handleMouseDown(event) {
        this.line = new PIXI.Graphics();
        this.line.lineStyle(2, 0xFFFFFF, 1);
        this.stage.addChild(this.line);
        this.points = [event.clientX, event.clientY];
    }

    handleMouseMove(event) {
        if (this.points) {
            this.points.push(event.clientX);
            this.points.push(event.clientY);
            this.line.drawPolygon(this.points)
        }
    }

    handleMouseUp() {
        this.points = undefined;
    }
}

export default Canvas;
