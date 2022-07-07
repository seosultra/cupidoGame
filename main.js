const game = new Game();

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  backgroundMusic.play();
  backgroundMusic.loop();
  backgroundMusic.setVolume(0.1);
  userStartAudio();
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
