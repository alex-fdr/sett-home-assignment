import type { AssetsData } from './systems/types';

import modelGround from '/gltf/ground2.glb';
import modelObjects from '/gltf/objects2.glb';

import texturePlus from '/plus.png';
import textureCow from '/cow.png';
import textureSheep from '/sheep.png';
import textureChicken from '/chicken.png';

export const assetsList: AssetsData = {
    models: [
        {
            key: 'ground', 
            file: modelGround
        },
        {
            key: 'objects',
            file: modelObjects
        },
    ],
    textures: [
        { key: 'plus', file: texturePlus },
        { key: 'icon-cow', file: textureCow },
        { key: 'icon-sheep', file: textureSheep },
        { key: 'icon-chicken', file: textureChicken },
    ]
};