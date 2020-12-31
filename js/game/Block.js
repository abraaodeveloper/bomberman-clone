import GameObject from './GameObject.js';

export default class Block extends GameObject{

    constructor(line, column, x, y, width, height, img, tag, drop){
        super(line, column, x, y, width, height, img);

        this.tag = tag;
        this.drop = drop;
        this.bomb = null;
    }

    static unbreak = 'unbreak';
    static breakable = 'breakable';
    static road = 'road';

}