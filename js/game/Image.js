export default class Image{

    timeLeft = 0;
    timeRight = 0;
    timeTop = 0;
    timeDown = 0;

    constructor(top, right, down, left, idle){
        this.top = top;
        this.right = right;
        this.down = down;
        this.left = left;
        this.idle = idle;

        this.currentType = 'idle';
        this.index = 0;
        this.time = 0;
    }

    static typeImgTop = 'top';
    static typeImgRight = 'right';
    static typeImgDown = 'down';
    static typeImgLeft = 'left';
    static typeImgIdle = 'idle';

    getImage(){

        this.time++;

        if(this.currentType === 'idle'){ 
            this.index = 0;
            /*
            if(this.index === this.idle.length - 1){
                this.index = 0;
            }else{
                if(this.time === 10){
                    this.time = 0;
                    this.index++;
                }
            }
            */
            
            return this.idle[this.index];
        }  

        if(this.currentType === 'top'){ 
            if(this.index === this.top.length - 1){
                this.index = 0;
            }else{
                if(this.timeTop === 10){
                    this.timeTop = 0;
                    this.index++;
                }
                this.timeTop++;
                }
            
            return this.top[this.index];
        } 

        if(this.currentType === 'right'){ 
            if(this.index === this.right.length - 1){
                this.index = 0;
            }else{
                if(this.timeRight === 10){
                    this.timeRight = 0;
                    this.index++;
                }
                this.timeRight++;
            }
            
            return this.right[this.index];
        } 

        if(this.currentType === 'down'){ 
            if(this.index === this.down.length - 1){
                this.index = 0;
            }else{
                if(this.timeDown === 10){
                    this.timeDown = 0;
                    this.index++;
                }
                this.timeDown++;
            }
            
            return this.down[this.index];
        }

        if(this.currentType === 'left'){ 
            if(this.index === this.left.length - 1){
                this.index = 0;
            }else{
                if(this.timeLeft === 10){
                    this.timeLeft = 0;
                    this.index++;
                }
                this.timeLeft++;
            }
            
            return this.left[this.index];
        }
    }
}