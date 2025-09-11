import { Object3D, Vector3 } from 'three';
import type { BaseEntity } from './base-entity';

export type SlotProps = {
    position: Vector3;
    parent: Object3D;
};

export class Slot extends Object3D {
    public entity!: BaseEntity;

    constructor({ position, parent }: SlotProps) {
        super();

        this.position.copy(position);
        parent.add(this);
    }

    public isEmpty(): boolean {
        return this.children.length === 0;
    }
}