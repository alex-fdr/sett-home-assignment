export class UISystem {
    private domElements: Record<string, HTMLElement> = {};

    constructor() {
        
    }

    public addScreen(id: string): void {
        const screen = document.getElementById(id);

        if (!screen) {
            return;
        }

        this.domElements[id] = screen;

        // a hack for smooth animation of display:none prorepty
        screen.addEventListener('transitionend', () => {
            if (screen.classList.contains('hiding')) {
                screen.classList.replace('hiding', 'hidden');
            }
        });
    }

    public show(name: string): void {
        console.log('show screen:', name);
        this.domElements[name]?.classList.replace('hidden', 'shown');
    }

    public hide(name: string): void {
        console.log('hide screen:', name);
        this.domElements[name]?.classList.replace('shown', 'hiding');
    }
}