import * as PIXI from 'pixi.js';

export default class Knight extends PIXI.AnimatedSprite{
    size: number = 48;
    speed: number = 2;
    isJumping: boolean = false;
    isFalling: boolean = false;
    direction: 'left' | 'right' | 'idle' = 'idle';
    knightTextures: knightTypes;

    constructor({
        idle,
        left,
        right
    }:knightTypes ) {
        super(idle);

        this.knightTextures = {
            idle,
            left,
            right
        }

        this.width = this.size;
        this.height = this.size;
        this.y = 250;
        this.animationSpeed = 0.15;
        this.play();

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
    }


    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.direction !== 'left' && this.runAnimationArray('left');
                break
            case "D":
            case "ARROWRIGHT":
                this.direction !== 'right' && this.runAnimationArray('right');
                break
            case "W":
            case "ARROWUP":
                if(!this.isJumping) this.isJumping = true;
                break
        }
    }

    onKeyUp(e: KeyboardEvent): void {
        this.direction !== 'idle' && this.runAnimationArray('idle');
    }

    idleAnimationArray(){
        this.textures = this.knightTextures.idle;
        this.play();
    }

    runAnimationArray(direction: 'left' | 'right' | 'idle' = 'left') {
        this.direction = direction;
        this.textures = this.knightTextures[direction];
        this.play();
    }

    jump(){
        if(this.isJumping && !this.isFalling) {
            this.y -= 1.5;
            if(this.y < 180) {
                this.isJumping = false;
                this.isFalling = true;
            }
        }

        if(this.isFalling) {
            if(this.y < 250) {
                this.y += 1.5;
            } else {
                this.isFalling = false
            }
        }
    }

    knightUpdate() {
        if(this.direction === 'left' && this.x > 0){
            this.x -= this.speed;
        } else if(this.direction === 'right' && this.x < 500 - this.width){
            this.x += this.speed;
        }

        this.jump();
    }
}

export interface knightTypes {
    idle: Array<PIXI.Texture>,
    left: Array<PIXI.Texture>,
    right: Array<PIXI.Texture>
}