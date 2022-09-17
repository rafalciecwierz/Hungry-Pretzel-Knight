import * as PIXI from 'pixi.js';

export default class Pigeon extends PIXI.AnimatedSprite {
    isFlying: boolean = false;
    spawnTimestamp: number = Date.now();
    minimumMillisecondsWait: number = 5000;
    rangeMillisecondsWait: number = 20000;

    constructor(texture: Array<PIXI.Texture>){
        super(texture);

        this.y = 270;
        this.animationSpeed = 0.15;
        this.play();
        this.backOnPosition()
    }

    backOnPosition() {
        this.x = -50;
        this.isFlying = false;
        this.spawnTimestamp = Date.now();
    }

    pigeonUpdate() {
        if(this.isFlying) {
            if(this.x < 500){
                this.x += 2;
            } else {
                this.backOnPosition();
            }
        }

        if(Date.now() - this.spawnTimestamp > (Math.random() * this.rangeMillisecondsWait) + this.minimumMillisecondsWait) {
            this.isFlying = true;
        }
    }
}