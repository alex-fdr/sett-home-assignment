import type { AssetsData } from './systems/types';

import modelGround from '/gltf/ground2.glb';
import modelObjects from '/gltf/objects2.glb';

import texturePlus from '/plus3.png';

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
    ]
};