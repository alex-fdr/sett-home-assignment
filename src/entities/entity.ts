import type { Game } from 'src/game';
import type { AnimationClip, Object3D, Vector3 } from 'three';

export type EntityProps = {
    game: Game;
    parent: Object3D;
    position?: Vector3;
    kind: 'cow' | 'sheep' | 'chicken';
};

// const entities = ['cow', 'sheep', 'chicken']

export class Entity {
    public model: Object3D;
    public parent: Object3D;
    public game: Game;
    public kind: EntityProps['kind'];
    public animations: AnimationClip[];

    constructor({ game, parent, position, kind: name }: EntityProps) {
        this.game = game;
        this.parent = parent;
        this.kind = name;

        this.model = this.game.assets.models.get('objects', `${name}_1`);
        this.animations = this.game.assets.models.getAnimations('objects');
        this.parent.add(this.model);

        if (position) {
            this.model.position.copy(position);
        }

        // this.model.scale.multiplyScalar(2);
    }
}