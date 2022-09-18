import * as PIXI from 'pixi.js';
import { drawRoundedRectangle } from '../utils/graphics';

export default class Gui extends PIXI.Container {
    score: number;
    lives: number;
    livesText: PIXI.Text;
    scoreText: PIXI.Text;

    constructor(score: number, lives: number, textures: Array<PIXI.Texture>) {
        super();

        this.score = score;
        this.lives = lives;
        this.scoreText = this.drawScoreText();
        this.livesText = this.drawLivesText();

        const livesBackground = drawRoundedRectangle({
            x: -10,
            y: this.livesText.y - 5,
            width: this.livesText.width + 30,
            height: this.livesText.height + 10,
            radius: 10,
            fill: 0x12202f,
        });

        const scoreBackground = drawRoundedRectangle({
            x: -10,
            y: this.scoreText.y - 5,
            width: this.scoreText.width + 40,
            height: this.scoreText.height + 10,
            radius: 10,
            fill: 0xd08b69,
        });

        this.addChild(scoreBackground);
        this.addChild(livesBackground);
        this.addChild(this.scoreText);
        this.addChild(this.livesText);
        this.addChild(this.drawHeart(textures));

    }

    drawScoreText() {
        const scoreText = new PIXI.Text(`Score: ${this.score}`, {
            fontSize: 10
        });

        scoreText.x = 10;
        scoreText.y = 30;

        return scoreText;
    }

    drawLivesText() {
        const livesText = new PIXI.Text(`Lives:        x ${this.lives}`, {
            fontSize: 10,
            fill: '#ffffff'
        });
        livesText.x = 10;
        livesText.y = 10;

        return livesText;
    }

    drawHeart(textures: Array<PIXI.Texture>) {
        const heart = new PIXI.AnimatedSprite(textures);

        heart.animationSpeed = 0.02;
        heart.y = this.livesText.y - 2
        heart.x = 38;
        heart.play();

        return heart;
    }

    updateScore(score: number) {
        this.scoreText.text = `Score: ${score}`
        this.score = score;
    }

    updateLives(lives: number) {
        this.livesText.text = `Lives:        x ${lives}`
        this.lives = lives;
    }
}