import { Object3D, Raycaster, Vector2, Vector3, type Intersection, type PerspectiveCamera, type WebGLRenderer } from 'three';

export abstract class InteractiveObject extends Object3D {
    public inputHandler!: Function;
    public abstract setInputHandler(callback: Function, raycaster: RaycasterHelper): void;
};

export class RaycasterHelper {
    public camera: PerspectiveCamera;
    public domElement: HTMLCanvasElement;
    public interactiveObjects: InteractiveObject[];
    public raycaster: Raycaster;
    public pointer: Vector2;
    public selectedObject: InteractiveObject | null;
    public selectedPoint: Vector3;
    public intersections: Intersection<InteractiveObject>[];

    constructor(camera: PerspectiveCamera, renderer: WebGLRenderer) {
        this.camera = camera;
        this.domElement = renderer.domElement;
        this.interactiveObjects = [];

        this.raycaster = new Raycaster();
        this.pointer = new Vector2();
        this.selectedObject = null;
        this.selectedPoint = new Vector3();
        this.intersections = [];
    }

    public init(): void {
        window.addEventListener('pointerdown', (event) => {
            this.process(event);
        })
    }

    public setInteractiveObjects(...objects: InteractiveObject[]): void {
        this.interactiveObjects.push(...objects);
    }

    public process(data: MouseEvent): void {
        const rect = this.domElement.getBoundingClientRect();
        this.pointer.x = ((data.clientX - rect.left) / rect.width) * 2 - 1;
        this.pointer.y = -((data.clientY - rect.top) / rect.height) * 2 + 1;

        this.intersections.length = 0;

        this.raycaster.setFromCamera(this.pointer, this.camera);
        this.raycaster.intersectObjects(this.interactiveObjects, true, this.intersections);

        if (this.intersections.length > 0) {
            this.selectedObject = this.intersections[0].object;
            this.selectedPoint.copy(this.intersections[0].point);
            this.selectedObject.inputHandler();
        }
    }
}