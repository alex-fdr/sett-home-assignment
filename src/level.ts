import { Group, Sprite, SpriteMaterial, Vector3, type Object3D, type PerspectiveCamera } from 'three';
import type { Game } from './game';
import type { EntityProps } from './entities/entity';
import { Ground } from './entities/ground';
import { Animal, type AnimalProps } from './entities/spawn/animal';
import { RaycasterHelper } from './systems/raycaster';
import { Icon } from './entities/icon';
import { Plant, type PlantProps } from './entities/spawn/plant';

export class Level {
    public parent: Object3D;
    public camera: PerspectiveCamera;
    public game: Game;
    public group: Group;
    public ground!: Ground;
    public animals!: Animal[];
    public raycaster: RaycasterHelper;

    constructor(game: Game, parent: Object3D, camera: PerspectiveCamera) {
        this.game = game;
        this.parent = parent;
        this.camera = camera;

        this.group = new Group();
        this.group.name = 'level';
        this.parent.add(this.group);

        this.raycaster = new RaycasterHelper(this.camera, this.game.renderer);

        this.animals = [];
    }

    public init(): void {
        this.raycaster.init();

        // const props: Omit<EntityProps, 'kind'> = {
        //     game: this.game,
        //     parent: this.group,
        // };

        this.addGround();
        this.addInteractiveIcons();

        // this.animals = [
        //     new Animal({
        //         ...props,
        //         kind: 'chicken',
        //     }),
        // //     new Animal({
        // //         ...props,
        // //         kind: 'cow',
        // //     }),
        // //     new Animal({
        // //         ...props,
        // //         kind: 'cow',
        // //     })
        // ];

        // this.animals[0].model.position.set(0, 4.2, -3);
        // // this.animals[1].model.position.set(4, 4.2, -3);
        // // this.animals[2].model.position.set(-4, 4.2, -3);

        // for (const animal of this.animals) {
        //     animal.animate('idle');
        // }

    }

    addGround() {
        this.ground = new Ground({
            game: this.game,
            parent: this.group,
            position: new Vector3(0),
        });
    }

    addInteractiveIcons() {
        const plus = new Icon({ 
            texture: this.game.assets.textures.get('plus', { flipY: true }),
            scaleFactor: 2,
            position: new Vector3(-2, 12, 0),
            parent: this.group,
        });

        const plus2 = new Icon({ 
            texture: this.game.assets.textures.get('plus', { flipY: true }),
            scaleFactor: 2,
            position: new Vector3(2, 12, 0),
            parent: this.group,
        });

        plus.setInputHandler(() => {
            this.game.ui.show('choice-animals');
            this.game.ui.hide('choice-plants');
        }, this.raycaster);

        plus2.setInputHandler(() => {
            this.game.ui.show('choice-plants');
            this.game.ui.hide('choice-animals');
        }, this.raycaster);

        this.game.ui.setEventHandler('choice-animals', 'pointerdown', (id: string) => {
            this.addAnimal(id as AnimalProps['kind']);
            this.game.ui.hide('choice-animals');
        }, true);

        this.game.ui.setEventHandler('choice-plants', 'pointerdown', (id: string) => {
            this.addPlant(id as PlantProps['kind']);
            this.game.ui.hide('choice-plants');
        }, true);
    }

    addAnimal(kind: AnimalProps['kind']): void {
        console.log('add animal:', kind);

        const animal = new Animal({
            game: this.game,
            parent: this.group,
            kind,
            position: new Vector3(Math.random() * 10 - 5, 4.2, Math.random() * 10 - 5),
        });
        animal.model.rotateOnWorldAxis(new Vector3(0, 1, 0), Math.random() * 2 - 1);
        animal.animate('idle');
        this.animals.push(animal);
    }

    addPlant(kind: PlantProps['kind']): void {
        console.log('add plant');

        const plant = new Plant({
            game: this.game,
            parent: this.group,
            kind,
            position: new Vector3(Math.random() * 10 - 5, 4.2, Math.random() * 10 - 5),
        });
    }

    public update(deltaTime: number): void {
        for (const animal of this.animals) {
            animal.update(deltaTime);
        }
    }
}