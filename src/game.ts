import { AmbientLight, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { ResizeHelper } from './helpers/resize-helper';

export type GameOptions = {
    width: number;
    height: number;
};

export class Game {
    public scene: Scene;
    public camera: PerspectiveCamera;
    public renderer: WebGLRenderer;
    public resizer: ResizeHelper;
    public ambientLight: AmbientLight;
    public directionalLight: DirectionalLight;

    constructor({ width, height }: GameOptions) {
        this.scene = this.addScene();
        this.camera = this.addCamera(width, height);
        this.renderer = this.addRenderer(width, height);
        this.ambientLight = this.addAmbientLight(this.scene);
        this.directionalLight = this.addDirectionalLight(this.scene);
        this.resizer = new ResizeHelper(this.camera, this.renderer);
    }

    private addScene(): Scene {
        const scene = new Scene();
        return scene;
    }

    private addCamera(width: number, height: number): PerspectiveCamera {
        const fov = 75;
        const aspect = width / height;
        const near = 0.1;
        const far = 1000;
        const camera = new PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 0, 5);
        return camera;
    }

    private addRenderer(width: number, height: number): WebGLRenderer {
        const renderer = new WebGLRenderer({
            antialias: true,
            alpha: false,
        });
        renderer.setSize(width, height);
        document.body.append(renderer.domElement);
        return renderer;
    }

    private addAmbientLight(scene: Scene): AmbientLight {
        const light = new AmbientLight(0xffffff, 0.7);
        scene.add(light);
        return light;
    }

    private addDirectionalLight(scene: Scene): DirectionalLight {
        const light = new DirectionalLight(0xffffff, 1.0);
        light.position.set(0, 10, 10);
        scene.add(light);
        return light;
    }

    public start(): void {
        this.resizer.init();
        this.renderer.setAnimationLoop(this.update.bind(this));
    }

    public update(): void {
        this.renderer.render(this.scene, this.camera);
    }
}