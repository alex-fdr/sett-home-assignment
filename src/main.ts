import { Game } from './game';

const game = new Game({
    width: window.innerWidth,
    height: window.innerHeight,
});

window.addEventListener('load', () => {
    game.start();
})