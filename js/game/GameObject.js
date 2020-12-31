export default class GameObject{
    constructor(line, column, x, y, width, height, img){
        this.line = line;
        this.column = column;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = img;
    }

    /**
    * check collision with another GameObject
    * @param GameObject 
    * @param number
    * @param number
    * @return GameObject or false
    */
    checkCollisionWith(gObj, newX, newY){       
        const corners = [
            { x: newX, y: newY },
            { x: newX + this.width, y: newY },
            { x: newX, y: newY + this.height },
            { x: newX + this.width, y: newY + this.height }
        ];

        for (const corner of corners) {
            if (corner.x > gObj.x && corner.x < gObj.x + gObj.width
                && corner.y > gObj.y && corner.y < gObj.y + gObj.height) {
                return gObj;
            }
        }

        return false;
    }
}