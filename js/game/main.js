import { generateBattlefield, generateAndPositionPlayers, clearSafeAreaForPlayers, generateHtmlStatusOfPlayers } from './util.js';
import Game from './Game.js';

(function () {

    const size = 100; // size block

    const perfectFrameTime = 1000 / 60;
    let deltaTime = 0;
    let lastTimestamp = 0;
    let width = parseInt((window.innerWidth / size), 10);
    let height = parseInt((window.innerHeight / size), 10);

    const canvas = document.createElement("canvas");
    canvas.width = size * width;
    canvas.height = size * height;
    const gameArea = document.getElementById('game-area');
    gameArea.appendChild(canvas);

    let fieldGame = generateBattlefield(width, height, size);
    let players = generateAndPositionPlayers(fieldGame, 2, size, (size * 0.7), (size * 0.9));
    clearSafeAreaForPlayers(fieldGame, players);
    generateHtmlStatusOfPlayers(players);

    let game;

    function start() {
        game = new Game(fieldGame, players, canvas, size);
        //game.myGameArea.start();
        requestAnimationFrame(update);
    }

    function update(timestamp) {
        requestAnimationFrame(update);
        deltaTime = (timestamp - lastTimestamp) / perfectFrameTime;
        lastTimestamp = timestamp;



        game.updateGameState();
        game.renderGameView();
    }

    document.onkeydown = (evt) => game.processUserInputs('down', evt);
    document.onkeyup = (evt) => game.processUserInputs('up', evt);

    /*
    window.addEventListener('gamepadconnected', (event) => {
    });

    for (const gamepad of navigator.getGamepads()) {
        if (!gamepad) continue;
        for (const [index, axis] of gamepad.axes.entries()) {
            console.log(gamepad.index, index, axis * 0.5 + 0.5);

        }
    }
    */

    start();
})();

