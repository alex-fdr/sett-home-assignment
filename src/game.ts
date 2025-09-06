import { AmbientLight, Clock, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { ResizeHelper } from './helpers/resize-helper';
import { UISystem } from './systems/ui';
import { AssetsSystem } from './systems/assets';
import { assetsList } from './assets-list';
import { Level } from './level';

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
        // this.ui.addScreen('gameplay');
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
        camera.position.set(0, 10, 10);
        // camera.lookAt(new Vector3(0, 0, -10));
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

    public async start(): Promise<void> {
        await this.assets.load(assetsList);

        this.resizer.init();
        this.renderer.setAnimationLoop(this.update.bind(this));
        
        this.ui.hide('loading');
        this.ui.show('gameplay');

        this.level.init();
    }

    public update(): void {
        const deltaTime = this.clock.getDelta();
        this.level.update(deltaTime);
        this.renderer.render(this.scene, this.camera);
    }
}