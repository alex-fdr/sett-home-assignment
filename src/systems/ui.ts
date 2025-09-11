export class UISystem {
    private domElements: Record<string, HTMLElement> = {};

    constructor() {
        
    }

    public addScreen(id: string): void {
        const screen = document.getElementById(id);

        if (!screen) {
            throw new Error(`no element with id=${name} found`);
        }

        this.domElements[id] = screen;

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

    public setEventHandler(name: string, event: keyof HTMLElementEventMap, callback: Function): void {
        const element = document.getElementById(name);
        
        if (!element) {
            throw new Error(`no element with id=${name} found`);
        }

        element.addEventListener(event, () => callback(element.id));
    }

    private getScreen(name: string): HTMLElement {
        const element = this.domElements[name];

        if (!element) {
            throw new Error(`no screen with id=${name} found`);
        }

        return element;
    }
}