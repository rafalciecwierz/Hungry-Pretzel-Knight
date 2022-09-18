import * as PIXI from 'pixi.js'

export default class Menu {
    title: PIXI.Text;
    buttonText: PIXI.Text;
    buttonBg: PIXI.Graphics;
    background: PIXI.Graphics;
    scene: PIXI.Container;
    app: PIXI.Application;
    wasClicked: boolean = false;

    constructor(
        app: PIXI.Application,
        options: menuOptionsType
    ) {
        this.app = app;
        this.title = this.createTitle(options.title);
        this.buttonText = this.createButtonText(options.buttonText);
        this.buttonBg = this.drawRectangle(0x333333);
        this.background = this.drawBackground();
        this.scene = this.createScene();

        app.stage.addChild(this.scene);
    }

    createTitle(newTitleText: string) {
        const textStyle = {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: '#000000',
            stroke: '#D08B69',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        }

        const titleText = new PIXI.Text(newTitleText, textStyle);

        titleText.y = this.app.view.height / 2 - titleText.height / 2 - 50;
        titleText.x = this.app.view.width / 2 - titleText.width / 2;

        return titleText;
    };

    createButtonText(newButtonText: string) {
        const textStyle = {
            fontFamily: 'Arial',
            fontSize: 14,
            fill: 'white',
        }

        const buttonText = new PIXI.Text(newButtonText, textStyle);

        buttonText.y = this.app.view.height / 2 - buttonText.height / 2;
        buttonText.x = this.app.view.width / 2 - buttonText.width / 2;

        return buttonText;
    };

    drawBackground() {
        const bg = new PIXI.Graphics()
            .beginFill()
            .drawRect(0, 0, this.app.view.width, this.app.view.height)
            .endFill();

        bg.alpha = 0.7;

        return bg;
    }

    drawRectangle(fill: number) {
        const padding = 20;

        return new PIXI.Graphics().beginFill(fill).drawRect(this.buttonText.x - padding / 2, this.buttonText.y - padding / 2, this.buttonText.width + padding, this.buttonText.height + padding).endFill();
    };

    createScene() {
        const container = new PIXI.Container();

        container.addChild(this.background);
        container.addChild(this.buttonBg);
        container.addChild(this.title);
        container.addChild(this.buttonText);

        container.interactive = true
        container.buttonMode = true

        container.on('pointerdown', () => this.wasClicked = true);
        container.on('mouseover', () => this.buttonBg.tint = 0x333333);
        container.on('mouseout', () => this.buttonBg.tint = 0xFFFFFF);
        ;

        return container;
    };

    removeScene() {
        this.scene.destroy();
    }

    getWasClicked() {
        return this.wasClicked;
    }
}

interface menuOptionsType {
    title: string;
    buttonText: string;
}