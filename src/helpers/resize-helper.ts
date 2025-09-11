import type { PerspectiveCamera, WebGLRenderer } from 'three';
import { config } from '../config';

export class ResizeHelper {
    public camera: PerspectiveCamera;
    public renderer: WebGLRenderer;

    constructor(camera: PerspectiveCamera, renderer: WebGLRenderer) {
        this.camera = camera;
        this.renderer = renderer;
    }

    public init(): void {
        window.addEventListener('resize', () => {
            this.process(window.innerWidth, window.innerHeight);
        });

        this.process(window.innerWidth, window.innerHeight);
    }

    public process(width: number, height: number): void {
        this.camera.aspect = width / height;
        this.camera.fov = config.camera.fov;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }
}