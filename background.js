class Background {
  constructor() {
    // by default the background fills the entire canvas, therefore the left side starts on the coordinate 0
    this.left = 0;
  }

  preload() {
    this.img = loadImage("./images/backg.png");
  }

  drawBackground() {
    // we have two images being drawn in order to create the illusion that we have an infinite continuous background
    // while one image is continuously "leaving" the canvas, the other one is right behind continuously "appearing" in the canvas
    image(this.img, this.left, 0, CANVAS_WIDTH, 500);
    image(this.img, this.left + CANVAS_WIDTH, 0, CANVAS_WIDTH, 500);

    // every frame the main image moves 4 units to the left
    this.left -= 4;

    // whenever the location is totally off canvas (-CANVAS_WIDTH stands for totally off the entirety of the canvas) we reset the left location to 0
    if (this.left <= -CANVAS_WIDTH) {
      this.left = 0;
    }
  }
}