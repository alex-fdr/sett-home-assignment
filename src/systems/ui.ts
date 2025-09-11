import { ParticleSystem } from './particles';

export class UISystem {
    private screens: Record<string, HTMLElement> = {};
    public particles: ParticleSystem;

    constructor() {
        this.particles = new ParticleSystem(100);
    }

    public addScreen(id: string): void {
        const screen = document.getElementById(id);

        if (!screen) {
            throw new Error(`no element with id=${name} found`);
        }

        this.screens[id] = screen;

        // a hack for smooth animation of display:none prorepty
        screen.addEventListener('animationend', () => {
            if (screen.classList.contains('hiding')) {
                screen.classList.replace('hiding', 'hidden');
            }
        })
    }

    public show(name: string): void {
        console.log('show screen:', name);
        const screen = this.getScreen(name);
        screen.classList.replace('hidden', 'shown');
    }

    public hide(name: string): void {
        console.log('hide screen:', name);
        const screen = this.getScreen(name);
        screen.classList.replace('shown', 'hiding');
    }

    public showElement(name: string): void {
        const element = this.getElement(name);
        element.classList.replace('hidden', 'shown');
    }

    public hideElement(name: string): void {
        const element = this.getElement(name);

        if (element.classList.contains('show')) {
            element.classList.replace('shown', 'hiding');
        } else {
            element.classList.add('hiding');
        }
    }

    public setEventHandler(name: string, event: keyof HTMLElementEventMap, callback: Function): void {
        const element = document.getElementById(name);
        
        if (!element) {
            throw new Error(`no element with id=${name} found`);
        }

        element.addEventListener(event, () => callback(element.id));
    }

    private getScreen(name: string): HTMLElement {
        const element = this.screens[name];

        if (!element) {
            throw new Error(`no screen with id=${name} found`);
        }

        return element;
    }

    private getElement(name: string): HTMLElement {
        const element = document.getElementById(name);
        
        if (!element) {
            throw new Error(`no element with id=${name} found`);
        }

        return element;
    }
}