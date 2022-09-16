import * as PIXI from 'pixi.js';

export default class Pretzel extends PIXI.Sprite {
    speed: number = 1;
    isFalling: boolean = false;

    constructor(texture: PIXI.Texture) {
        super(texture);
        this.backOnPosition();
    }

    update() {
        const luck = Math.random();

        if(luck < 0.008) {
             this.isFalling = true;
        }
        if(this.isFalling) {
            this.y += this.speed;
            this.rotation += 0.05;
        }
    }

    backOnPosition(){
        this.y = -30;
        this.x = (Math.random() * 460) + 20;
        this.isFalling = false;
        this.speed += 0.05;
    }

}