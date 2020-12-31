import Bloco from './Block.js';
import { imgsMap, imgsPlayer, imgsBomb, imgsPowers } from './util-assets/imgs.js';
import { inputs } from './util-assets/inputs.js';
import Player from './Player.js';
import Powers from './Powers.js';

// remove blocks breacks
const directions = [
    { incrLine: 0, incrColumn: -1 }, // top
    { incrLine: 0, incrColumn: 1 }, // down
    { incrLine: -1, incrColumn: 0 }, // left
    { incrLine: 1, incrColumn: 0 } // right
];

function clearSafeAreaForPlayers(fieldGame, players) {
    for (const player of players) {
        for (const pos of directions) {
            if (fieldGame[player.line + pos.incrLine][player.column + pos.incrColumn].tag != Bloco.unbreak) {
                fieldGame[player.line + pos.incrLine][player.column + pos.incrColumn].tag = Bloco.road;
                fieldGame[player.line + pos.incrLine][player.column + pos.incrColumn].img = imgsMap.road;
            }
        }

        // block of center
        if (fieldGame[player.line][player.column].tag != Bloco.unbreak) {
            fieldGame[player.line][player.column].tag = Bloco.road;
            fieldGame[player.line][player.column].img = imgsMap.road;
        }
    }

    return fieldGame;
}

function generateAndPositionPlayers(fieldGame, qtdPlayers, size, width, height) {
    const posPossibles = [
        [1, 1],
        [fieldGame.length - 2, fieldGame[0].length - 2],
        [fieldGame.length - 2, 1],
        [1, fieldGame[0].length - 2]
    ];
    const players = [];

    if (qtdPlayers > 4) {
        qtdPlayers = 4;
        alert("Desculpe-me, A quantidade de jogadores não deve passar de 4!");
    }

    for (let i = 0; i < qtdPlayers && i <= 4; i++) {

        // line, column, x, y, width, height, img, powers, inputs
        players.push(new Player(
            posPossibles[i][0], posPossibles[i][1],
            posPossibles[i][0] * size, posPossibles[i][1] * size,
            width, height,
            imgsPlayer(),
            new Powers(),
            inputs[i],
            new Bloco(
                posPossibles[i][0], posPossibles[i][1],
                posPossibles[i][0] * size, posPossibles[i][1] * size,
                size, size, imgsMap.road, Bloco.road, null),
            i
        ));
    }

    return players;
}

function generateHtmlStatusOfPlayers(players) {
    let html = "";
    for (const player of players) {
        html +=
         "<div>" +
            "<h3> Name: </h3>" + "<div> " + player.id + "</div>" +
            "<h3> Life: </h3>" + "<div> " + player.powers.life + "</div>" +
            "<h3> Velocity: </h3>" + "<div> " + player.powers.velocity + "</div>" +
            "<h3> Bombs: </h3>" + "<div> " + player.powers.qtdBomb + "</div>" +
            "<h3> Bomb Power: </h3>" + "<div> " + player.powers.bombPower + "</div>"
        + "</div>";
    }

    document.getElementById("status-game").innerHTML = html;
}

function generateBattlefield(lines, columns, size) {
    const battleFieldg = []
    for (let l = 0; l < lines; l++) {
        const mLine = [];
        for (let c = 0; c < columns; c++) {
            if (l % 2 != 1 && c % 2 != 1) { //line, column, x, y, width, height, img, tag, drop
                mLine.push(new Bloco(l, c, l * size, c * size, size, size, imgsMap.unbreak, Bloco.unbreak, null));
            } else {
                if (l === 0 || c === 0 || c === columns - 1 || l === lines - 1) {
                    mLine.push(new Bloco(l, c, l * size, c * size, size, size, imgsMap.unbreak, Bloco.unbreak, null));
                } else {
                    if (getRandomIntInclusive(0, 1) === 1) {
                        mLine.push(new Bloco(l, c, l * size, c * size, size, size, imgsMap.breakable, Bloco.breakable, null));
                    } else {
                        /*const value = Math.random();
                        if (value > 0 && value < 0.5) {
                            mLine.push(new Bloco(l, c, l * size, c * size, size, size, imgsMap.road, Bloco.road,
                                new Powers(l, c, (l * size) + size / 4, (c * size) + size / 4, size / 2, size / 2, imgsPowers.speed, 1, 0, 0, 0)));
                        }
                        else if (value > 1 && value < 1.5) {
                            mLine.push(new Bloco(l, c, l * size, c * size, size, size, imgsMap.road, Bloco.road,
                                new Powers(l, c, (l * size) + size / 4, (c * size) + size / 4, size / 2, size / 2, imgsPowers.bomb, 0, 1, 0, 0)));
                        }
                        else if (value > 2 && value < 2.5) {
                            mLine.push(new Bloco(l, c, l * size, c * size, size, size, imgsMap.road, Bloco.road,
                                new Powers(l, c, (l * size) + size / 4, (c * size) + size / 4, size / 2, size / 2, imgsPowers.bombPower, 0, 0, 1, 0)));
                        }
                        else if (value > 3 && value < 3.5) {
                            mLine.push(new Bloco(l, c, l * size, c * size, size, size, imgsMap.road, Bloco.road,
                                new Powers(l, c, (l * size) + size / 4, (c * size) + size / 4, size / 2, size / 2, imgsPowers.life, 0, 0, 0, 1)));
                        }
                        else {*/
                        mLine.push(new Bloco(l, c, l * size, c * size, size, size, imgsMap.road, Bloco.road, null));
                        //}
                    }
                }
            }
        }
        battleFieldg.push(mLine);
    }

    return battleFieldg;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { generateAndPositionPlayers, generateBattlefield, clearSafeAreaForPlayers, generateHtmlStatusOfPlayers};