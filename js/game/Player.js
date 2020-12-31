import GameObject from './GameObject.js';
import Bloco from './Block.js';

export default class Player extends GameObject{

    constructor(line, column, x, y, width, height, img, powers, inputs, lastBlockCollider, id) {
        super(line, column, x, y, width, height, img);

        this.powers = powers;
        this.inputs = inputs;

        this.lastBlockCollider = lastBlockCollider;
        this.id = id;
    }

    move(incrX, incrY, blocks) {
        let collidedInUnbreak = false;
        const newX = this.x + (this.powers.velocity * incrX);
        const newY = this.y + (this.powers.velocity * incrY);

        for (const block of blocks) {
            const lastColided = this.checkCollisionWith(block, newX, newY);
            if (lastColided) {
                if(lastColided.bomb){
                    if(lastColided.bomb.playerSave != this.id){
                        collidedInUnbreak = true;
                    }
                }

                this.lastBlockCollider = block;
                if (lastColided.tag === Bloco.unbreak || lastColided.tag === Bloco.breakable) {
                    collidedInUnbreak = true;
                }
            }
        }

        if (!collidedInUnbreak) {
            this.x = newX;
            this.y = newY;
        }
    }
}