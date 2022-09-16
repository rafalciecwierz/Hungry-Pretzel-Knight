import * as PIXI from 'pixi.js';

export default class Background extends PIXI.Sprite {
    constructor(texture: PIXI.Texture) {
        super(texture);
        this.x = -6;

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    }

    update() {
        this.x -= 0.015
    }

    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                if (this.x < 0) this.x += 1;
                break
            case "D":
            case "ARROWRIGHT":
                if (this.x > -12) this.x -= 1;
                break
        }
    }
}