import * as PIXI from 'pixi.js';

const loadGameAssets = () => {
    const loader = PIXI.Loader.shared;

    loader.baseUrl = 'images';

    loadMapAssets(loader);
    loaderGuiAssets(loader);
    loadKnightAssets(loader);
    loadFoodAssets(loader);
    loadPigeonAssets(loader);

    loader.onProgress.add((loader) => console.log(loader.progress));

    return loader;
};


const loadKnightAssets = (loader: PIXI.Loader) => {
    for (let i = 0; i < 6; i++) {
        if (i < 4) loader.add(`knight_idle_${i}`, `/knight/knight_idle_${i}.png`);
        loader.add(`knight_left_${i}`, `/knight/knight_left_${i}.png`);
        loader.add(`knight_right_${i}`, `/knight/knight_right_${i}.png`);
    };
}

const loadPigeonAssets = (loader: PIXI.Loader) => {
    for (let i = 0; i < 4; i++) {
        loader.add(`pigeon${i}`, `/pigeon/pigeon${i}.png`);
    };
}

const loadMapAssets = (loader: PIXI.Loader) => {
    loader.add('map', '/maps/map.png');
}

const loadFoodAssets = (loader: PIXI.Loader) => {
    loader.add('pretzel', '/food/pretzel.png');
    loader.add('peach', '/food/peach.png');
}

const loaderGuiAssets = (loader: PIXI.Loader) => {
    loader.add('heart0', '/gui/heart0.png');
    loader.add('heart1', '/gui/heart1.png');
}


export default loadGameAssets;