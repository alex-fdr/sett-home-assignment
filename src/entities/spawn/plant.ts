import { Entity, type EntityProps } from '../entity';

export type PlantProps = EntityProps & {
    kind: 'tomato' | 'corn'
};

export class Plant extends Entity {
    public static kinds: PlantProps['kind'][] = ['corn', 'tomato'];

    constructor(props: PlantProps) {
        super(props);
    }

    public static getRandomKind(): PlantProps['kind'] {
        const index = Math.floor(Math.random() * Plant.kinds.length);
        return Plant.kinds[index];
    }
}