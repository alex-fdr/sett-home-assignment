import type { AnimationClip, Group, Object3D } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils'
import type { ModelLoadData } from '../types';

type StorageItem = {
    model: Group;
    animations: AnimationClip[];
}

// type ModelLoadData = {
//     key: string;
//     file: string;
// };

export class ModelLoader {
    public baseUrl: string;
    public storage: Record<string, StorageItem>;
    public loader: GLTFLoader;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.storage = {};
        this.loader = new GLTFLoader();
    }

    loadAll(queue: ModelLoadData[] = []) {
        return Promise.allSettled(queue.map(this.load, this));
    }

    load({ key, file }: ModelLoadData) {
        return new Promise((resolve) => {
            this.loader.load(file, (data) => {
                resolve(data);
                this.storage[key] = { 
                    model: data.scene, 
                    animations: data.animations
                };
            });
        });
    }

    get(key: string, name?: string): Object3D | never {
        const { model } = this.storage[key];
        const mesh = name ? model.getObjectByName(name) : model;

        if (!mesh) {
            throw new Error(`no mesh named ${key} found`);
        }

        if (model.getObjectByProperty('type', 'SkinnedMesh')) {
            return SkeletonUtils.clone(mesh);
        }

        return mesh.clone();
    }

    // getSkeleton(key, name) {
    //     const { model } = this.storage[key];
    //     const mesh = name ? model.getObjectByName(name) : model;
    //     return SkeletonUtils.clone(mesh);
    // }

    getAnimation(key: string, index = 0) {
        return this.storage[key].animations[index]
    }

    getAnimations(key: string) {
        return this.storage[key].animations;
    }
}