const game = new Game();

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  game.play();
}

function preload() {
  game.preload();
}

function keyPressed() {
  game.keyPressed();
}
