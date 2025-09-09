import type { Game } from 'src/game';
import { Group, Vector3, type AnimationClip, type Object3D } from 'three';

export type EntityProps = {
    game: Game;
    parent: Object3D;
    kind: string;
    position: Vector3;
};

export class Entity  {
    public model: Object3D;
    public parent: Object3D;
    public game: Game;
    public kind: EntityProps['kind'];
    public animations: AnimationClip[];

    constructor({ game, parent, kind, position }: EntityProps) {
        this.game = game;
        this.parent = parent;
        this.kind = kind;

        this.model = this.game.assets.models.get('objects', `${kind}_1`);
        this.animations = this.game.assets.models.getAnimations('objects');
        this.parent.add(this.model);

        this.model.position.copy(position);
    }
}