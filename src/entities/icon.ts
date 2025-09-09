import type { RaycasterHelper } from 'src/systems/raycaster';
import { Object3D, Sprite, SpriteMaterial, Texture, Vector3, type SpriteMaterialParameters } from 'three';

export abstract class InteractiveSprite extends Sprite {
    public inputHandler!: Function;
    public abstract setInputHandler(callback: Function, raycaster: RaycasterHelper): void;
}

export type IconProps = {
    scaleFactor: number;
    position: Vector3;
    parent: Object3D;
    texture: Texture;
};

export class Icon extends InteractiveSprite {
    constructor({ texture, scaleFactor, position, parent }: IconProps) {
        super(new SpriteMaterial({ map: texture }));

        this.scale.multiplyScalar(scaleFactor);
        this.position.copy(position);

        parent.add(this);
    }

    public setInputHandler(callback: Function, raycaster: RaycasterHelper): void {
        this.inputHandler = callback;
        raycaster.setInteractiveObjects(this);
    }
}