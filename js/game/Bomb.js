import GameObject from "./GameObject.js";

export default class Bomb extends GameObject {
    constructor(line, column, x, y, width, height, img, indexPlayer) {
        super(line, column, x, y, width, height, img);

        this.time = 0;
        this.sizeState = 1;
        this.indexPlayer = indexPlayer;
        this.increBomb = 0;
        this.tick = 0;
        this.playerSave = this.indexPlayer;
    }

    tickAndUpdate(force) {
        this.time++;

        if (this.tick === 0) {
            if (this.sizeState >= 1) {
                this.increBomb = -1;
            } else if (this.sizeState <= 0.8) {
                this.increBomb = 1;
            }

            this.sizeState += (0.1 * this.increBomb);
        }

        if (this.tick <= 15) {
            this.tick++;
        } else this.tick = 0;

        if (this.time === 100) {
            //this.players[bomb.indexPlayer].powers.qtdBomb++;// corrigir o -1

            const directions = [
                { x: 0, y: 0 }, // center
                { x: 0, y: -1 }, // top
                { x: 0, y: 1 }, // down
                { x: -1, y: 0 }, // left
                { x: 1, y: 0 } // right
            ];
            const positionsToRemove = [];


            for (const d of directions) {
                for (let i = 1; i <= force; i++) {

                    let c1 = this.line + (d.x * i);
                    let c2 = this.column + (d.y * i)

                    positionsToRemove.push({line: c1, column: c2});
                }
            }

            return {indexPlayer: this.indexPlayer, poses: positionsToRemove};
        }

        return false;
    }
}