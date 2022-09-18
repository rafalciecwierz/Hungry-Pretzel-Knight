import * as PIXI from 'pixi.js';

export default class Peach extends PIXI.Sprite {
    isFalling: boolean = false;

    constructor(texture: PIXI.Texture) {
        super(texture);

        this.backOnPosition();
    }

    update() {
        const luck = Math.random();

        if (luck < 0.0005) {
            this.isFalling = true;
        }
        if (this.isFalling) {
            this.y += 1;
            this.rotation -= 0.03;
        }
    }

    backOnPosition() {
        this.y = -30;
        this.x = (Math.random() * 460) + 20;
        this.isFalling = false;
    }
}