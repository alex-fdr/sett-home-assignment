import { randomArray } from '../utils';

export class ParticleSystem {
    public elements: HTMLDivElement[] = [];
    public parent: HTMLElement;
    public cssClasses = [
        'particle-cow',
        'particle-sheep',
        'particle-chicken',
        'particle-corn',
        'particle-tomato',
    ];
    public total: number;

    constructor(total: number) {
        this.total = total;
        this.parent = document.getElementById('particles')!;
    }

    public generate() {
        for (let i = 0; i < this.total; i++) {
            const particle = this.createElement();
            this.elements.push(particle);
            this.parent.appendChild(particle);
        }        
    }

    private createElement(): HTMLDivElement {
        const div = document.createElement('div');
        div.style.top = `-10vmax`;
        div.style.left = `${Math.random() * 100}vw`;
        div.style.animationDuration = `${Math.random() * 4 + 2}s`;
        div.style.animationDelay = `${Math.random() * 4}s`;
        div.style.scale = `${Math.random() * 0.5 + 0.5}`
        div.classList.add('particle');
        div.classList.add(randomArray(this.cssClasses));
        return div;
    }
}