import { TextureLoader as BaseLoader, RepeatWrapping, Texture } from 'three';
import type { TextureLoadData } from '../types';

// type TextureLoadData = {
//     key: string;
//     file: string;
// };

type TextureProps = {
    clone: boolean;
    flipY: boolean;
    repeatX: number;
    repeatY: number;
};

export class TextureLoader {
    public baseUrl: string;
    public storage: Record<string, Texture>;
    public loader: BaseLoader;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.storage = {};
        this.loader = new BaseLoader();
    }

    loadAll(queue: TextureLoadData[] = []) {
        return Promise.allSettled(queue.map(this.load, this));
    }

    load({ key, file }: TextureLoadData) {
        return new Promise((resolve) => {
            this.loader.load(file, (data) => {
                resolve(data);
                this.storage[key] = data;
            });
        });
    }

    get(key: string, {
        clone = false, 
        flipY = false, 
        repeatX = 0, 
        repeatY = repeatX
    }: Partial<TextureProps> = {}) {

        let texture = this.storage[key];
        texture = clone ? texture.clone() : texture;
        texture.flipY = flipY;

        if (repeatX) {
            texture.repeat.set(repeatX, repeatY);
            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;
        }

        return texture;
    }
}