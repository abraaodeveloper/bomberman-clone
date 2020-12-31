import GameObject from "./GameObject.js";

export default class Powers extends GameObject{
    constructor(line, column, x, y, width, height, img, velocity = 5, qtdBomb = 2, bombPower = 1, life = 3){
        super(line, column, x, y, width, height, img);
        this.velocity = velocity;
        this.qtdBomb = qtdBomb;
        this.bombPower = bombPower;
        this.life = life;
    }
}