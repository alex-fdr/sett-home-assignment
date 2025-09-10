import { AnimationAction, AnimationClip, AnimationMixer, LoopRepeat } from 'three';
import { Entity, type EntityProps } from '../entity';

type Actions = {
    idle: AnimationAction;
    action: AnimationAction;
};

export type AnimalProps = EntityProps & {
    kind: 'cow' | 'sheep' | 'chicken';
};

export type AnimalKind = AnimalProps['kind'];

export class Animal extends Entity {
    private mixer: AnimationMixer;
    private actions: Actions;
    public animations: AnimationClip[];
    public static kinds: AnimalKind[] = ['cow', 'sheep', 'chicken'];

    constructor(props: AnimalProps) {
        super(props);

        this.animations = this.game.assets.models.getAnimations('objects', this.kind);
        this.mixer = new AnimationMixer(this.model);

        this.actions = {
            idle: this.createAnimationAction('idle'),
            action: this.createAnimationAction('action'),
        };
    }

    private createAnimationAction(name: keyof Actions): AnimationAction {
        const clip = AnimationClip.findByName(this.animations, `${name}_${this.kind}`);

        if (!clip) {
            throw new Error(`no animation clip named ${name} found`);
        }

        const action = this.mixer.clipAction(clip);
        action.timeScale = 1;
        action.clampWhenFinished = true;
        action.setLoop(LoopRepeat, Infinity);
        return action;
    }

    public animate(name: keyof Actions): void {
        this.actions[name].play();
    }

    public update(deltaTime: number): void {
        this.mixer.update(deltaTime);
    }
}