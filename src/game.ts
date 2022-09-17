import * as PIXI from 'pixi.js';
import { sound } from '@pixi/sound';
import Menu from './views/menu';
import Background from './sprites/bg';
import Knight from './sprites/knight';
import Pretzel from './sprites/pretzel';
import Gui from './views/gui';
import loadGameAssets from './utils/loader';
import { collisionDetection } from './utils/collision';
import Peach from './sprites/peach';
import Pigeon from './sprites/pigeon';

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
    pigeon: Pigeon | undefined;
    pretzel: Pretzel | undefined;
    peach: Peach | undefined;

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
        this.knight.visible = false;
        this.pixi.stage.addChild(this.knight);

        // PIGEON
        this.pigeon = new Pigeon([
            resources.pigeon0.texture,
            resources.pigeon1.texture,
            resources.pigeon2.texture,
            resources.pigeon3.texture,
        ])
        this.pixi.stage.addChild(this.pigeon);

        // PRETZEL
        this.pretzel = new Pretzel(resources.pretzel.texture);
        this.pretzel.visible = false;
        this.pixi.stage.addChild(this.pretzel);

        // Peach
        this.peach = new Peach(resources.peach.texture);
        this.peach.visible = false;
        this.pixi.stage.addChild(this.peach);

        // START THE TICK
        this.pixi.ticker.add((delta) => this.update())


        sound.play('bgSound');
    }

    update() {
        if (this.menu && this.gui && this.knight && this.pretzel && this.peach && this.pigeon) {
            if (!this.isStart) {
                if (this.menu.getWasClicked()) {
                    this.menu.removeScene();

                    this.knight.x = this.pixi.view.width / 2 - this.knight.size / 2;
                    this.knight.resetSpeed();
                    this.knight.visible = true;

                    this.pretzel.backOnPosition();
                    this.pretzel.resetSpeed();
                    this.pretzel.visible = true;

                    this.peach.backOnPosition();
                    this.peach.visible = true;

                    this.score = 0;
                    this.lives = 10;

                    this.gui.updateLives(this.lives);
                    this.gui.updateScore(this.score);

                    this.isStart = true;
                }
            } else {
                // SPIRTES MOVE UPDATE
                this.knight.knightUpdate();
                this.pretzel.update();
                this.peach.update();
                this.pigeon.pigeonUpdate();

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

                // GRABBING THE PEACH
                if (collisionDetection(this.knight, this.peach)) {
                    this.peach.backOnPosition();
                    this.knight.speedUp();
                }

                // PEACH OUT
                if (this.peach.y > 300) {
                    this.peach.backOnPosition();
                };

                // STOMPING ON THE PIGEON
                if (collisionDetection(this.knight, this.pigeon)) {
                    this.pigeon.backOnPosition();
                    this.lives -= 3;
                    if(this.lives < 0) this.lives = 0;
                    this.gui.updateLives(this.lives);
                }

                // END OF THE GAME
                if (this.lives <= 0) {
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