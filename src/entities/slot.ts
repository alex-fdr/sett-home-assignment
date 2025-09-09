import type { Entity } from './entity';

export class Slot {
    public entity: Entity;

    constructor(entity: Entity) {
        this.entity = entity;
    }
}