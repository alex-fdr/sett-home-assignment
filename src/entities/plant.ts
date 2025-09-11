import { BaseEntity, type BaseEntityProps } from './base-entity';

export type PlantProps = BaseEntityProps & {
    kind: 'tomato' | 'corn',
};

export type PlantKind = PlantProps['kind'];

export class Plant extends BaseEntity {
    public static kinds: PlantKind[] = ['corn', 'tomato'];

    constructor(props: PlantProps) {
        super(props);
    }
}