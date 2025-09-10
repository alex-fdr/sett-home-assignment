import type { Game } from './game';
import { Group, Vector3, type Object3D, type PerspectiveCamera } from 'three';
import { Ground } from './entities/ground';
import { RaycasterHelper } from './systems/raycaster';
import { Choices } from './systems/choices';
import { GardenUnit } from './garden-unit';

export class Level {
    public parent: Object3D;
    public camera: PerspectiveCamera;
    public game: Game;
    public group: Group;
    public ground!: Ground;
    public raycaster: RaycasterHelper;
    public choices: Choices;
    public gardenUnits: GardenUnit[];

    constructor(game: Game, parent: Object3D, camera: PerspectiveCamera) {
        this.game = game;
        this.parent = parent;
        this.camera = camera;

        this.group = new Group();
        this.group.name = 'level';
        this.parent.add(this.group);

        this.raycaster = new RaycasterHelper(this.camera, this.game.renderer);

        this.gardenUnits = [];
        this.choices = new Choices();
    }

    public init(): void {
        this.raycaster.init();
       
        this.addGround();
        this.addGardenAnimalsUnit();
        this.addGardenPlantsUnit();
     
    }

    public update(deltaTime: number): void {
        for (const unit of this.gardenUnits) {
            unit.update(deltaTime);
        }
    }

    private addGround(): void {
        this.ground = new Ground({
            game: this.game,
            parent: this.group,
            position: new Vector3(0),
        });
    }

    private addGardenAnimalsUnit(): void {
        const gardenAnimals = new GardenUnit({
            game: this.game,
            parent: this.group,
            choiceVariant: 'choice-animals',
            level: this,
            iconPosition: new Vector3(-2, 10, 0),
            slotsPositions: [
                new Vector3(-3, 4.25, 0),
                new Vector3(-1, 4.25, 0),
                new Vector3(1, 4.25, 0),
                new Vector3(3, 4.25, 0),
            ],
        });

        this.gardenUnits.push(gardenAnimals);
    }

    private addGardenPlantsUnit(): void {
        const gardenPlants = new GardenUnit({
            game: this.game,
            parent: this.group,
            choiceVariant: 'choice-plants',
            level: this,
            iconPosition: new Vector3(2, 10, 0),
            slotsPositions: [
                new Vector3(-3, 4.25, -3),
                new Vector3(-1, 4.25, -3),
                new Vector3(1, 4.25, -3),
                new Vector3(3, 4.25, -3),
            ],
        });

        this.gardenUnits.push(gardenPlants);
    }
}