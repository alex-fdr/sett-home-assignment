import type { AssetsData } from './systems/types';

import modelGround from './assets/models/ground2.glb';
import modelObjects from './assets/models/objects2.glb';

import texturePlus from './assets/textures/plus.png';

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
        { 
            key: 'plus', 
            file: texturePlus 
        },
    ]
};