import Image from '../Image.js';

const roadImg = document.createElement("IMG");
const unbreakImg = document.createElement("IMG");
const breakableImg = document.createElement("IMG");

roadImg.src = 'img/field-game/chao3.png';
unbreakImg.src = 'img/field-game/parede.png';
breakableImg.src = 'img/field-game/tijolo.png';

const bombImg = document.createElement("IMG");
bombImg.src = 'img/bomb/bomb.png';

const lifeImg = document.createElement("IMG");
const bombPowerImg = document.createElement("IMG");
const velocityImg = document.createElement("IMG");
const addBombImg = document.createElement("IMG");
lifeImg.src = 'img/powers/life.png';
bombPowerImg.src = 'img/powers/bomb-power.png';
velocityImg.src = 'img/powers/ray.png';
addBombImg.src = 'img/bomb/bomb.png';

const imgsMap = {
    road: roadImg,
    unbreak: unbreakImg,
    breakable: breakableImg
}

const imgsPowers = {
    life: lifeImg,
    speed: velocityImg,
    bombPower: bombPowerImg,
    bomb: addBombImg
}

const imgsBomb = {
    staticImg: bombImg
}

function generateImgs(name, qtd){
    const imgs = [];
    for(let i=1; i <= qtd; i++){
        const img = document.createElement("IMG");
        img.src = name + i +'.png';

        imgs.push(img);
    }

    return imgs;
}

function imgsPlayer(){
    return new Image(
        generateImgs('img/player/bomber-top', 2),
        generateImgs('img/player/bomber-right', 3),
        generateImgs('img/player/bomber-down', 3),
        generateImgs('img/player/bomber-left', 2),
        generateImgs('img/player/bomber-down', 1)
    );
}

export {imgsMap, imgsPlayer, imgsBomb, imgsPowers};