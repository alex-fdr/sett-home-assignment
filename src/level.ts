import { Group, Vector3, type Object3D, type PerspectiveCamera } from 'three';
import type { Game } from './game';
import type { EntityProps } from './entities/entity';
import { Ground } from './entities/ground';
import { Animal } from './entities/animal';

export class Level {
    public parent: Object3D;
    public camera: PerspectiveCamera;
    public game: Game;
    public group: Group;
    public ground!: Ground;
    public animals!: Animal[];


    constructor(game: Game, parent: Object3D, camera: PerspectiveCamera) {
        this.game = game;
        this.parent = parent;
        this.camera = camera;

        this.group = new Group();
        this.group.name = 'level';
        this.parent.add(this.group);
    }

    public init(): void {
        const props: Omit<EntityProps, 'kind'> = {
            game: this.game,
            parent: this.group,
        };

        this.ground = new Ground(props);

        this.animals = [
            new Animal({
                ...props,
                kind: 'cow',
                position: new Vector3(0, 4.2, -3),
            }),
            new Animal({
                ...props,
                kind: 'cow',
                position: new Vector3(-2, 4.2, -3),
            }),
            new Animal({
                ...props,
                kind: 'cow',
                position: new Vector3(-4, 4.2, -3),
            })
        ];

        for (const animal of this.animals) {
            animal.animate('idle');
        }
    }

    public update(deltaTime: number): void {
        for (const animal of this.animals) {
            animal.update(deltaTime);
        }
    }
}