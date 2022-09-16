import * as PIXI from 'pixi.js';

export const collisionDetection = (sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) => {
    const bounds1 = sprite1.getBounds()
    const bounds2 = sprite2.getBounds()

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}