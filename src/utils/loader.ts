import { sound } from '@pixi/sound';
import * as PIXI from 'pixi.js';

const loadGameAssets = () => {
    const loader = PIXI.Loader.shared;

    loadMapAssets(loader);
    loaderGuiAssets(loader);
    loadKnightAssets(loader);
    loadFoodAssets(loader);
    loadPigeonAssets(loader);
    loadMusic(loader);

    loader.onProgress.add((loader) => console.log(loader.progress));

    return loader;
};


const loadKnightAssets = (loader: PIXI.Loader) => {
    for (let i = 0; i < 6; i++) {
        if (i < 4) loader.add(`knight_idle_${i}`, `images/knight/knight_idle_${i}.png`);
        loader.add(`knight_left_${i}`, `images/knight/knight_left_${i}.png`);
        loader.add(`knight_right_${i}`, `images/knight/knight_right_${i}.png`);
    };
}

const loadPigeonAssets = (loader: PIXI.Loader) => {
    for (let i = 0; i < 4; i++) {
        loader.add(`pigeon${i}`, `images/pigeon/pigeon${i}.png`);
    };
}

const loadMapAssets = (loader: PIXI.Loader) => {
    loader.add('map', 'images/maps/map.png');
}

const loadFoodAssets = (loader: PIXI.Loader) => {
    loader.add('pretzel', 'images/food/pretzel.png');
    loader.add('peach', 'images/food/peach.png');
}

const loaderGuiAssets = (loader: PIXI.Loader) => {
    loader.add('heart0', 'images/gui/heart0.png');
    loader.add('heart1', 'images/gui/heart1.png');
}

const loadMusic = (loader: PIXI.Loader) => {
    loader.add('bgSound', '/music/bgMusic.mp3');
}


export default loadGameAssets;