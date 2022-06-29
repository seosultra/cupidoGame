class Player {
  constructor() {
    this.left = 50;
    this.top = 0;
    this.width = 50;
    this.height = 50;
    this.velocity = 0;
    this.jumpCount = 0;
    this.movespeed = 5;
  }

  preload() {
    this.img = loadImage("images/cupido.png");
  }

  keyPressed() {
    if (keyCode === ARROW_UP) {
      this.jump();
    }
    if (keyCode === SPACE_BAR) {
      this.shootDevil();
    }
  }
  jump() {
    if (this.jumpCount === 5) {
      return;
    }
    this.top -= 45;
    this.velocity -= 5;
    this.jumpCount++;
  }
  move(key) {
    if (key === ARROW_LEFT) {
      if (this.left >= 0) {
        this.left -= this.movespeed;
      }
    }
    if (key === ARROW_RIGHT) {
      if (this.left <= CANVAS_WIDTH - this.width) {
        this.left += this.movespeed;
      }
    }
  }

  shootDevil() {
    const heartLocation = this.cupidoLocation();
    this.devilArray.push(new Devil(heartLocation.top, heartLocation.left));
  }
  cupidoLocation() {
    return {
      top: this.top + 20,
      left: this.left + 10,
    };
  }

  drawPlayer() {
    this.velocity += GRAVITY;
    this.top += this.velocity;
    image(this.img, this.left, this.top, this.width, this.height);
    if (this.hasReachedTheGround()) {
      this.top = CANVAS_HEIGHT - this.height;
      this.velocity = 0;
      this.jumpCount = 0;
    }
  }
  hasReachedTheGround() {
    return this.top >= CANVAS_HEIGHT - this.height;
  }
}
