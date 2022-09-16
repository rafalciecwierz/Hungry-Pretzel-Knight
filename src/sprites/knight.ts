import * as PIXI from 'pixi.js';

export default class Knight extends PIXI.AnimatedSprite{
    size: number = 48;
    speed: number = 2;
    isJumping: boolean = false;
    isFalling: boolean = false;
    direction: 'left' | 'right' | 'idle' = 'idle';

    constructor() {
        let textureArray = [];

        for (let i=0; i < 4; i++)
        {
            let texture = PIXI.Texture.from(`./images/knight/knight iso char_idle_${i}.png`);
            textureArray.push(texture);
        };

        super(textureArray);

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
            case " ":
                break;
            case "A":
            case "ARROWLEFT":
                this.direction !== 'left' && this.runAnimationArray('left');

                // if (this.x > 0) this.x -= this.size / 4;

                break
            case "D":
            case "ARROWRIGHT":
                this.direction !== 'right' && this.runAnimationArray('right');

                // if (this.x < 500 - this.size) this.x += this.size / 4;

                break
            case "W":
            case "ARROWUP":
                if(!this.isJumping) this.isJumping = true;
                break
            case "S":
            case "ARROWDOWN":
                console.log('crouch');
                break
        }
    }

    onKeyUp(e: KeyboardEvent): void {
        this.direction !== 'idle' && this.runAnimationArray('idle');
    }

    idleAnimationArray(){
        let textureArray = [];

        for (let i=0; i < 4; i++)
        {
            let texture = PIXI.Texture.from(`./images/knight/knight iso char_idle_${i}.png`);
            textureArray.push(texture);
        };

        this.textures = textureArray;
        this.play();
    }

    runAnimationArray(direction: 'left' | 'right' | 'idle' = 'left') {
        let textureArray = [];
        const directionNamePath = direction === 'idle' ? 'char_idle' : `char_run ${direction}`

        this.direction = direction;

        for (let i=0; i < 4; i++)
        {
            let texture = PIXI.Texture.from(`/images/knight/knight iso ${directionNamePath}_${i}.png`);
            textureArray.push(texture);
        };

        this.textures = textureArray;
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