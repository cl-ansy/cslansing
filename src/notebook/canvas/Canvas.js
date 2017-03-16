import React, { Component } from 'react';
import * as PIXI from 'pixi.js';


const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class Particle {
    constructor() {
        // const texture = PIXI.Texture.fromImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/rp-0.png?123');
        const texture = PIXI.Texture.fromImage('https://i1.wp.com/freepngimages.com/wp-content/uploads/2014/04/wasp_2.png?fit=220%2C220');
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.scale.x = 0.4;
        this.sprite.scale.y = 0.4;
        this.offset = { x: Math.random() * 300, y: Math.random() * 300 };
        this.velocity = { x: 0, y: 0 };
    }

    setPosition(pos) {
        this.sprite.position.x = pos.x;
        this.sprite.position.y = pos.y;
    }

    setVelocity(vel) {
        this.velocity = vel;
    }

    update(mousePos) {
        const w = this.sprite.width / 2;
        const h = this.sprite.height / 2;
        if (mousePos) {
            this.sprite.position.x = mousePos.x - 20 - this.offset.x;
            // this.sprite.position.x = mousePos.x - w;
            this.sprite.position.y = mousePos.y - 20 - this.offset.y;
            return;
        }

        if (this.sprite.position.x-w > WIDTH || this.sprite.position.x+w < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.sprite.position.y-h > HEIGHT || this.sprite.position.y+h < 0) {
            this.velocity.y = -this.velocity.y;
        }

        this.sprite.position.x += this.velocity.x;
        this.sprite.position.y += this.velocity.y;
    }
}

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
        renderer.backgroundColor = 0xFFFFFF;
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

        this.launchBees();
        this.renderer.render(this.stage);
        requestAnimationFrame(this.update);
    }

    update = () => {
        this.renderer.render(this.stage);
        for (var i = this.bees.length - 1; i >= 0; i--) {
            this.bees[i].update(this.mousePos);
        }
        this.frame = requestAnimationFrame(this.update);
    }

    launchBees() {
        this.bees = [];
        for (var i = 0; i < 100; i++) {
            let bee = this.bees[i] = new Particle();
            bee.setPosition({ x: Math.random() * WIDTH, y: Math.random() * HEIGHT });
            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            bee.setVelocity({ x: plusOrMinus, y: plusOrMinus });
            this.stage.addChild(bee.sprite)
        }
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
                onMouseDown={this.handleMouseDown.bind(this)}
                onMouseMove={this.handleMouseMove.bind(this)}
                onMouseUp={this.handleMouseUp.bind(this)}
                onMouseLeave={this.handleBlur.bind(this)}
                style={{
                    position: 'fixed',
                    width: `${WIDTH}px`,
                    height: `${HEIGHT}px`
                }}
            />
        );
    }

    handleMouseDown(event) {
        // this.line = new PIXI.Graphics();
        // this.line.lineStyle(2, 0xFFFFFF, 1);
        // this.stage.addChild(this.line);
        // this.points = [event.clientX, event.clientY];
    }

    handleMouseMove(event) {
        this.mousePos = {
            x: event.clientX,
            y: event.clientY
        };
        // if (this.points) {
        //     this.points.push(event.clientX);
        //     this.points.push(event.clientY);
        //     this.line.drawPolygon(this.points)
        // }
    }

    handleMouseUp() {
        // this.points = undefined;
    }

    handleBlur() {
        this.mousePos = null;
    }
}

export default Canvas;
