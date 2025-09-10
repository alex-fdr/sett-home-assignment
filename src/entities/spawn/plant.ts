import { Entity, type EntityProps } from '../entity';

export type PlantProps = EntityProps & {
    kind: 'tomato' | 'corn',
};

export type PlantKind = PlantProps['kind'];

export class Plant extends Entity {
    public static kinds: PlantKind[] = ['corn', 'tomato'];

    constructor(props: PlantProps) {
        super(props);
    }
}