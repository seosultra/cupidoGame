class Player {
    constructor() {}

    preload(){
        this.img = loadImage('./images/cupido.png');
    }
    drawPlayer() {
        image(this.img, 0, 0, 50, 50);
    }
}