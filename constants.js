const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const SPACE_BAR = 32;
const ENTER_KEY = 13;
const scoreSpan = document.querySelector(".score span");
const livesSpan = document.querySelector(".lives span");

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 500;

const GRAVITY = 0.2;

const DIRECTIONS = {
  left: ARROW_LEFT,
  up: ARROW_UP,
  right: ARROW_RIGHT,
  down: ARROW_DOWN,
};
Object.freeze(DIRECTIONS);
