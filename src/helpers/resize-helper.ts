import type { PerspectiveCamera, WebGLRenderer } from 'three';

export class ResizeHelper {
    public camera: PerspectiveCamera;
    public renderer: WebGLRenderer;
    // public orientation: 'landscape' | 'portrait';

    constructor(camera: PerspectiveCamera, renderer: WebGLRenderer) {
        this.camera = camera;
        this.renderer = renderer;
        // this.orientation = 'landscape';
    }

    public init(): void {
        window.addEventListener('resize', () => {
            this.process(window.innerWidth, window.innerHeight);
        });

        this.process(window.innerWidth, window.innerHeight);
    }

    public process(width: number, height: number): void {
        // this.orientation = width > height ? 'landscape' : 'portrait';

        this.camera.aspect = width / height;
        this.camera.fov = 75;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }
}