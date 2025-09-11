import { AmbientLight, Clock, Color, DirectionalLight, Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { ResizeHelper } from './helpers/resize-helper';
import { UISystem } from './systems/ui';
import { AssetsSystem } from './systems/assets';
import { assetsList } from './assets-list';
import { Level } from './level';
import { config } from './config';

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
    public ui: UISystem;
    public assets: AssetsSystem;
    public level: Level;
    public clock: Clock;

    constructor({ width, height }: GameOptions) {
        this.scene = this.addScene();
        this.camera = this.addCamera(width, height);
        this.renderer = this.addRenderer(width, height);
        this.ambientLight = this.addAmbientLight(this.scene);
        this.directionalLight = this.addDirectionalLight(this.scene);

        this.resizer = new ResizeHelper(this.camera, this.renderer);
        this.ui = new UISystem();
        this.assets = new AssetsSystem();
        this.clock = new Clock();
        
        this.level = new Level(this, this.scene, this.camera);

        this.ui.addScreen('loading');
        this.ui.addScreen('menu');
        this.ui.addScreen('gameplay');

        this.handleInput();
    }

    private addScene(): Scene {
        const scene = new Scene();
        scene.background = new Color('#99c5dd');
        return scene;
    }

    private addCamera(width: number, height: number): PerspectiveCamera {
        const fov = config.camera.fov;
        const aspect = width / height;
        const near = 0.1;
        const far = 1000;
        const camera = new PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(10, 8, 5.5);
        camera.rotateOnAxis(new Vector3(1, 0, 0), -Math.PI * 0.18);
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
        const light = new DirectionalLight(0xffffff, 3.0);
        light.position.set(15, 25, 50);
        scene.add(light);
        return light;
    }

    public async load(): Promise<void> {
        await this.assets.load(assetsList);
    
        this.resizer.init();
        this.renderer.setAnimationLoop(this.update.bind(this));
        
        this.ui.hide('loading');
        this.ui.show('menu');
    }

    public start(): void {
        this.ui.hide('menu');
        this.ui.show('gameplay');
        this.level.init();
    }

    public handleInput() {
        this.ui.setEventHandler('start-game-button', 'pointerdown', () => {
            this.start();
        });
    }

    public update(): void {
        const deltaTime = this.clock.getDelta();
        this.level.update(deltaTime);
        this.renderer.render(this.scene, this.camera);
    }
}