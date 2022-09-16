import * as PIXI from 'pixi.js';
import Menu from './views/menu';
import Background from './sprites/bg';
import Knight from './sprites/knight';
import Pretzel from './sprites/pretzel';
import Gui from './views/gui';
import loadGameAssets from './utils/loader';
import { collisionDetection } from './utils/collision';

export default class Game {

    pixi: PIXI.Application;
    loader: PIXI.Loader;
    score: number = 0;
    lives: number = 10;
    isStart: boolean = false;
    bg: Background | undefined;
    gui: Gui | undefined;
    menu: Menu | undefined;
    knight: Knight | undefined;
    pretzel: Pretzel | undefined;

    constructor(width: number, height: number) {
        this.pixi = new PIXI.Application({ width, height, antialias: true });
        document.body.appendChild(this.pixi.view);

        // INITIALIZE LOADER
        this.loader = loadGameAssets();
        this.loader.load(this.doneLoading.bind(this))
    }

    doneLoading(loader: any, resources: any) {
        console.log("all textures loaded!");

        // BACKGROUND
        this.bg = new Background(resources.map.texture);
        this.pixi.stage.addChild(this.bg);

        // GUI
        this.gui = new Gui(this.score, this.lives, [
            resources.heart0.texture,
            resources.heart1.texture
        ]);
        this.pixi.stage.addChild(this.gui);

        // MENU
        this.menu = new Menu(this.pixi, {
            title: 'Welcome Sir Pretzel!',
            buttonText: 'Click to start the game',
            isWelcome: true
        });

        // KNIGHT
        this.knight = new Knight({
            idle: [
                resources.knight_idle_0.texture,
                resources.knight_idle_1.texture,
                resources.knight_idle_2.texture,
                resources.knight_idle_3.texture,
            ],
            left: [
                resources.knight_left_0.texture,
                resources.knight_left_1.texture,
                resources.knight_left_2.texture,
                resources.knight_left_3.texture,
                resources.knight_left_4.texture,
                resources.knight_left_5.texture,
            ],
            right: [
                resources.knight_right_0.texture,
                resources.knight_right_1.texture,
                resources.knight_right_2.texture,
                resources.knight_right_3.texture,
                resources.knight_right_4.texture,
                resources.knight_right_5.texture,
            ],

        });
        this.knight.x = this.pixi.view.width / 2 - this.knight.size / 2;
        this.knight .visible = false;
        this.pixi.stage.addChild(this.knight);

        // PRETZEL
        this.pretzel = new Pretzel(resources.pretzel.texture);
        this.pretzel.visible = false;
        this.pixi.stage.addChild(this.pretzel);

        // START THE TICK
        this.pixi.ticker.add((delta) => this.update())
    }

    update() {
        if (this.menu && this.gui && this.knight && this.pretzel) {
            if (!this.isStart) {
                if (this.menu.getWasClicked()) {
                    this.menu.removeScene();
                    this.knight.visible = true;
                    this.pretzel.visible = true;
                    this.pretzel.backOnPosition();
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
                if (collisionDetection(this.knight, this.pretzel)) {
                    this.pretzel.backOnPosition();
                    this.score += 1;
                    this.gui.updateScore(this.score);
                }

                // PRETZEL OUT
                if (this.pretzel.y > 300) {
                    this.pretzel.backOnPosition();
                    this.lives -= 1;
                    this.gui.updateLives(this.lives);
                };

                // END OF THE GAME
                if (this.lives === 0) {
                    this.isStart = false;
                    this.score = 0;
                    this.lives = 2;
                    this.knight.visible = false;
                    this.pretzel.visible = false;

                    this.menu = new Menu(this.pixi, {
                        title: 'You lost!',
                        buttonText: 'Click here to try again',
                        isWelcome: false
                    });
                }
            }
        }
    }
}