import * as PIXI from 'pixi.js';
import Menu from './views/menu';
import Background from './sprites/bg';
import Knight from './sprites/knight';
import Pretzel from './sprites/pretzel';
import Gui from './views/gui';

export default class Game {

    pixi: PIXI.Application;
    loader: PIXI.Loader;
    score: number = 0;
    lives: number = 2;
    isStart: boolean = false;
    menu: Menu;
    gui: Gui;
    bg: Background;
    knight: Knight;
    pretzel: Pretzel

    constructor(width: number, height: number) {
        this.pixi = new PIXI.Application({ width, height, antialias: true });
        document.body.appendChild(this.pixi.view);

        // LOADER
        this.loader = PIXI.Loader.shared;
        console.log(this.loader);

        this.loadAssets();


        // BACKGROUND
        this.bg = new Background(PIXI.Texture.from('./images/maps/map.png'));
        this.pixi.stage.addChild(this.bg);

        // GUI
        this.gui = new Gui(0, 10);
        this.pixi.stage.addChild(this.gui);

        // MENU
        this.menu = new Menu(this.pixi, {
            title: 'Welcome Sir Pretzel!',
            buttonText: 'Click to start the game',
            isWelcome: true
        });

        // KNIGHT
        this.knight = new Knight();
        this.knight.x = this.pixi.view.width / 2 - this.knight.size / 2;

        // PRETZEL
        this.pretzel = new Pretzel(PIXI.Texture.from('./images/food/pretzel.png'));


        //  Helper functions for testing
        // this.loader.add()
        // this.showScore();
        this.doneLoading();
    }

    showScore() {
        console.log(this.score);
    }

    doneLoading() {
        // console.log("all textures loaded!")
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    update(delta: number) {
        // console.log('update function');
        // console.log('SCORE: ' + this.score);
        // console.log('LIVES: ' + this.lives);

        if(!this.isStart){
            if (this.menu.getWasClicked()) {
                this.menu.removeScene();
                this.pixi.stage.addChild(this.knight);
                this.pixi.stage.addChild(this.pretzel);
                this.isStart = true;
                this.score = 0;
                this.lives = 10;
                this.gui.updateLives(this.lives);
                this.gui.updateScore(this.score);
            }
        } else {
            this.knight.knightUpdate();
            this.pretzel.update();

            // GRABBING THE PRETZEL
            if(this.collision(this.knight, this.pretzel)){
                console.log('THEY TOUCH!');
                this.pretzel.backOnPosition();
                this.score += 1;
                this.gui.updateScore(this.score);
            }

            // PRETZEL OUT
            if(this.pretzel.y > 300) {
                this.pretzel.backOnPosition();
                this.lives -= 1;
                this.gui.updateLives(this.lives);
            };

            // END OF THE GAME
            if(this.lives === 0){
                this.isStart = false;
                this.score = 0;
                this.lives = 2;
                this.knight.destroy();
                this.pretzel.destroy();

                this.knight = new Knight();
                this.knight.x = this.pixi.view.width / 2 - this.knight.size / 2;
                // PRETZEL
                this.pretzel = new Pretzel(PIXI.Texture.from('./images/food/pretzel.png'));

                this.menu = new Menu(this.pixi, {
                    title: 'You lost!',
                    buttonText: 'Click here to try again',
                    isWelcome: false
                });
            }
        }
    }

    loadAssets() {
        console.log('Assets are being load');
        this.loader.add('testRes1', './images/knight/knight iso char_idle_0.png')
            .add('testRes2', './images/knight/knight iso char_idle_1.png')

        this.loader.onProgress.add(() => console.log(this.loader.progress))
        this.loader.load(this.onFinishedLoading);
    }

    onFinishedLoading(loader: PIXI.Loader, resources: any) {
        console.log('Assets has been loaded');
        console.log(loader.progress);
        console.log(resources);
    }

    collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}