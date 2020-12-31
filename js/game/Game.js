import Bomb from './Bomb.js';
import Block from './Block.js';
import { imgsBomb, imgsMap } from './util-assets/imgs.js';
import Image from './Image.js';

export default class Game {

    constructor(fieldGame, players, canvas, sizeBlocks) {
        this.fieldGame = fieldGame;
        this.players = players;
        this.context = canvas.getContext("2d");
        this.bombs = [];
        this.size = sizeBlocks;
    }

    processUserInputs(type, evt) {
        if (type === 'down') {
            this._applyInputs(true, evt)
        } else if (type === 'up') {
            this._applyInputs(false, evt);
        }
    }

    _applyInputs(value, evt) {
        for (const player of this.players) {
            if (player.inputs.top.key === evt.key)
                player.inputs.top.active = value;
            if (player.inputs.down.key === evt.key)
                player.inputs.down.active = value;
            if (player.inputs.left.key === evt.key)
                player.inputs.left.active = value;
            if (player.inputs.right.key === evt.key)
                player.inputs.right.active = value;
            if (player.inputs.bomb.key === evt.key)
                player.inputs.bomb.active = value;
        }
    }

    updateGameState(deltaTime) {
        const posCheck = [
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 },
            { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }
        ];

        let indexPlayer = 0;
        for (const player of this.players) {
            let incrX = 0, incrY = 0;
            let lastColl;

            if (player.inputs.top.active) {
                player.img.currentType = Image.typeImgTop;
                incrY--;
            }
            if (player.inputs.down.active) {
                player.img.currentType = Image.typeImgDown;
                incrY++;
            }
            if (player.inputs.left.active) {
                player.img.currentType = Image.typeImgLeft;
                incrX--;
            }
            if (player.inputs.right.active) {
                player.img.currentType = Image.typeImgRight;
                incrX++;
            }

            if (incrX != 0 || incrY != 0) {
                // se esta dentro do campo de jogo
                lastColl = player.lastBlockCollider; //ultima colisao
                const blocks = [];

                for (const pos of posCheck) {
                    if (lastColl.line + pos.x >= 0 && lastColl.column + pos.y >= 0
                        && lastColl.line + pos.x <= this.fieldGame.length - 1
                        && lastColl.column + pos.y <= this.fieldGame[0].length - 1) {

                        blocks.push(this.fieldGame[lastColl.line + pos.x][lastColl.column + pos.y]);
                    }
                }
                tt = blocks;

                player.move(incrX, incrY, blocks);
            } else { // nao apertou nada
                player.img.currentType = Image.typeImgIdle;
            }

            if (player.inputs.bomb.active) {
                player.inputs.bomb.active = false;

                const l = player.lastBlockCollider.line;
                const c = player.lastBlockCollider.column;

                if (player.powers.qtdBomb >= 1 &&
                    this.fieldGame[l][c].tag === Block.road
                    && !this.fieldGame[l][c].bomb) {

                    this.fieldGame[l][c].bomb = new Bomb(
                        l, c, l * this.size, c * this.size, this.size, this.size, imgsBomb.staticImg, indexPlayer
                    );

                    player.powers.qtdBomb--;
                }
            }
            indexPlayer++;
        }

        this._updateTxtStatusGame();
    }

    _updateTxtStatusGame(){
        let newTxt = "";
        for(const player of this.players){
            newTxt += "Player "+player.id+":    Velocidade: " + player.powers.velocity + "    Bombas: " + player.powers.qtdBomb 
            + "    Explosão: " + player.powers.bombPower + "    Life: " + player.powers.life + "";
        }
    }

    _checkIfPlayerCollideInBomb(bomb, l, c) {
        const p = this.players[bomb.indexPlayer]; // player
        const collided = p.checkCollisionWith(bomb, p.x, p.y);

        if (!collided) {
            this.fieldGame[l][c].bomb.playerSave = null;
        }
    }

    _checkIfBlowBomb(bomb, l, c) {

        this._checkIfPlayerCollideInBomb(bomb, l, c);

        const removeBomb = bomb.tickAndUpdate(this.players[bomb.indexPlayer].powers.bombPower);
        if (removeBomb) {
            for (const pos of removeBomb.poses) {

                if (pos.line >= 0 && pos.line < this.fieldGame.length - 1
                    && pos.column >= 0 && pos.column < this.fieldGame[0].length - 1) {

                    if (this.fieldGame[pos.line][pos.column].tag === Block.breakable) {
                        this.fieldGame[pos.line][pos.column].tag = Block.road;
                        this.fieldGame[pos.line][pos.column].img = imgsMap.road;
                    }

                    for (const i in this.players) {
                        const collided = this.players[i].checkCollisionWith(
                            this.fieldGame[pos.line][pos.column],
                            this.players[i].x, this.players[i].y);

                        if (collided) {
                            this.players[i].powers.life--;
                            if (this.players[i].powers.life === 0) {
                                this.players.splice(i, 1)
                            }
                        }
                    }
                }
            }

            this.players[removeBomb.indexPlayer].powers.qtdBomb++;

            return true;
        }
    }

    renderGameView() {
        if (this.context) {
            this.context.clearRect(0, 0, this.fieldGame[0].length - 1 * 100, this.fieldGame.length - 1 * 100);
            for (const line of this.fieldGame) {
                for (const block of line) {
                    //console.log(block.img, block.x, block.y, block.width, block.height);
                    this.context.drawImage(block.img, block.x, block.y, block.width, block.height);
                    if (block.bomb) {
                        this.context.drawImage(block.bomb.img, block.bomb.x, block.bomb.y, block.bomb.width, block.bomb.height);

                        if (this._checkIfBlowBomb(block.bomb, block.line, block.column)) block.bomb = null;
                    }

                    if(block.drop){
                        this.context.drawImage(block.drop.img, block.drop.x, block.drop.y, block.drop.width, block.drop.height);
                    }
                }
            }

            /*
            for (const b of tt) {
                this.context.fillRect(b.x + 25, b.y + 25, b.width - 50, b.height - 50);
            }

            
            for (const i in this.bombs) {
                const sizeBomb = this.bombs[i].sizeState * this.bombs[i].width;
                const borderBomb = this.bombs[i].width - sizeBomb;
                this.context.drawImage(this.bombs[i].img,
                    (this.bombs[i].x * this.bombs[i].width) + borderBomb / 2,
                    (this.bombs[i].y * this.bombs[i].width) + borderBomb / 2,
                    this.bombs[i].sizeState * this.bombs[i].width,
                    this.bombs[i].sizeState * this.bombs[i].width);
            }
            */

            // players
            for (const player of this.players) {
                //this.context.fillRect(player.x, player.y, player.width, player.height);

                this.context.drawImage(player.img.getImage(), player.x, player.y, player.width, player.height);
            }
        }
    }
}