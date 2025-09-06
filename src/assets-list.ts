import type { AssetsData } from './systems/types';

import modelGround from '/gltf/ground2.glb';
import modelObjects from '/gltf/objects2.glb';

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
        // { key: '', file: '' },
    ]
};