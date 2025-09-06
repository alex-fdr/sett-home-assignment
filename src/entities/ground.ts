import type { Game } from 'src/game';
import type { Object3D } from 'three';
import type { EntityProps } from './entity';

export type GroundProps = Omit<EntityProps, 'kind'>;

export class Ground {
    public model: Object3D;
    public parent: Object3D;
    public game: Game;

    constructor({ game, parent }: GroundProps) {
        this.game = game;
        this.parent = parent;

        this.model = this.game.assets.models.get('ground');
        this.parent.add(this.model);
    }
}