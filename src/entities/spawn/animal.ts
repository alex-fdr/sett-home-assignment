import { AnimationAction, AnimationClip, AnimationMixer, LoopRepeat } from 'three';
import { Entity, type EntityProps } from '../entity';

type Actions = {
    idle: AnimationAction;
    action: AnimationAction;
};

export type AnimalProps = EntityProps & {
    kind: 'cow' | 'sheep' | 'chicken'
}

export class Animal extends Entity {
    private mixer: AnimationMixer;
    private actions: Actions;
    public static kinds: AnimalProps['kind'][] = ['cow', 'sheep', 'chicken'];

    constructor(props: AnimalProps) {
        super(props);

        this.mixer = new AnimationMixer(this.model);
        this.animations = this.animations.filter((anim) => anim.name.includes(this.kind));

        this.actions = {
            idle: this.createAnimationAction('idle'),
            action: this.createAnimationAction('action'),
        };

        console.log(this.actions)
    }

    public static getRandomKind(): AnimalProps['kind'] {
        const index = Math.floor(Math.random() * Animal.kinds.length);
        return Animal.kinds[index];
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