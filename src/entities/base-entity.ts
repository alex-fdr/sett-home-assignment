import type { Game } from 'src/game';
import { Vector3, type Object3D } from 'three';

export type BaseEntityKindSuffix = 1 | 2 | 3;

export type BaseEntityProps = {
    game: Game;
    parent: Object3D;
    kind: string;
    position: Vector3;
    suffix?: BaseEntityKindSuffix;
};

export class BaseEntity  {
    public model: Object3D;
    public parent: Object3D;
    public game: Game;
    public kind: BaseEntityProps['kind'];

    constructor({ game, parent, kind, position, suffix = 1 }: BaseEntityProps) {
        this.game = game;
        this.parent = parent;
        this.kind = kind;

        this.model = this.game.assets.models.get('objects', `${kind}_${suffix}`);
        this.parent.add(this.model);

        this.model.position.copy(position);
    }
}