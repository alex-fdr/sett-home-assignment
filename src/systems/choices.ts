export type ChoiceVariant = 'choice-plants' | 'choice-animals';

export class Choices {
    public current: ChoiceVariant | null;
    public elements: Map<ChoiceVariant, HTMLElement>;

    constructor() {
        this.elements = new Map();
        this.current = null;
    }

    public add(id: ChoiceVariant): void {
        this.elements.set(id, this.getHTMLElement(id));
    }

    public setEventHandler(name: ChoiceVariant, event: keyof HTMLElementEventMap, handler: Function): void {
        const element = this.elements.get(name)!;

        for (const item of element.children) {
            item.addEventListener(event, () => handler(item.id));
        }
    }

    public show(name: ChoiceVariant): void {
        if (this.current) {
            this.hide(this.current);
        }

        this.current = name;
        this.elements.get(this.current)!.classList.replace('hidden', 'shown');
    }

    public hide(name: ChoiceVariant | null): void {
        if (name) {
            this.elements.get(name)!.classList.replace('shown', 'hiding');
        }
    }

    private getHTMLElement(id: ChoiceVariant): HTMLElement {
        const element = document.getElementById(id);

        if (!element) {
            throw new Error(`no element with id=${id} found`);
        }

        element.addEventListener('animationend', () => {
            if (element.classList.contains('hiding')) {
                element.classList.replace('hiding', 'hidden');
            }
        });

        return element;
    }
}