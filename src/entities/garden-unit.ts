import { Vector3, type Object3D } from 'three';
import { Icon } from './icon';
import type { Game } from '../game';
import type { ChoiceVariant } from '../systems/choices';
import type { Level } from '../level';
import type { BaseEntity } from './base-entity';
import { Animal, type AnimalKind } from './animal';
import { Plant, type PlantKind } from './plant';
import { Slot } from './slot';
import { gsap } from 'gsap';

type GardenUnitProps = {
    game: Game;
    parent: Object3D;
    level: Level;
    choiceVariant: ChoiceVariant;
    iconPosition: Vector3;
    slotsPositions: Vector3[];
};

type EntityKind = AnimalKind | PlantKind;

export class GardenUnit {
    public slots: Slot[] = [];
    public icon!: Icon;
    public choiceVariant: ChoiceVariant;
    public game: Game;
    public parent: Object3D;
    public level: Level;
    public updateable: Animal[] = [];
    public completed = false;

    constructor({ game, parent, level, slotsPositions, iconPosition, choiceVariant }: GardenUnitProps) {
        this.game = game;
        this.parent = parent;
        this.level = level;
        this.choiceVariant = choiceVariant;

        this.level.choices.add(choiceVariant);

        this.addInteractiveIcon(iconPosition);
        this.handleInput();
        this.addSlots(slotsPositions);
    }

    public addInteractiveIcon(position: Vector3): void {
        this.icon = new Icon({
            texture: this.game.assets.textures.get('plus', { flipY: true }),
            scaleFactor: 0.8,
            position,
            parent: this.parent,
        });
    }

    public addSlots(positions: Vector3[]): void {
        for (const position of positions) {
            const slot = new Slot({ position, parent: this.parent });
            this.slots.push(slot);
        }
    }

    public handleInput(): void {
        this.icon.setInputHandler(() => {
            this.level.choices.show(this.choiceVariant);
        }, this.level.raycaster);

        this.level.choices.setEventHandler(this.choiceVariant, 'pointerdown', (kind: EntityKind) => {
            this.spawnEntity(kind);
            this.level.choices.hide(this.level.choices.current);
            this.completed = true;

            if (this.level.gardenUnits.every(unit => unit.completed)) {
                this.game.ui.showElement('finish-game-button');
            }
        });
    }

    public spawnEntity(kind: EntityKind): void {
        for (const slot of this.slots) {
            if (!slot.isEmpty()) {
                slot.clear();
            }

            if (this.choiceVariant.includes('animal')) {
                this.addAnimal(kind as AnimalKind, slot);
            } else {
                this.addPlant(kind as PlantKind, slot);
            }
        }
    }

    public update(deltaTime: number): void {
        for (const entity of this.updateable) {
            entity.update(deltaTime);
        }
    }

    private addAnimal(kind: AnimalKind, parent: Slot): void {
        const animal = new Animal({
            game: this.game,
            position: new Vector3(0),
            parent,
            kind,
        });
        animal.animate('idle');
        this.updateable.push(animal);
        this.animateEntityAppearence(animal);
    }

    private addPlant(kind: PlantKind, parent: Slot): void {
        const plant = new Plant({
            game: this.game,
            position: new Vector3(0),
            suffix: 3,
            parent,
            kind,
        });

        this.animateEntityAppearence(plant);
    }

    private animateEntityAppearence(entity: BaseEntity) {
        gsap.fromTo(entity.model.scale, {
            x: 0.5,
            y: 0.5,
        }, {
            x: 1,
            y: 1,
            duration: 0.4,
            ease: 'back',
        });
    }
}