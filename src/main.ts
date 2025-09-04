import { Game } from './game';
import './style.css';

const game = new Game({
    width: window.innerWidth,
    height: window.innerHeight,
});

game.start();