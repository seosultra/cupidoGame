class Player {
  constructor() {
    this.left = 50;
    this.top = 0;
    this.width = 50;
    this.height = 50;
    this.velocity = 0;
    this.jumpCount = 0;
    this.movespeed = 5;
    this.sky = 3;
    this.flechaArray = [];
    this.score = 7;
  }

  preload() {
    this.img = loadImage("images/cupido.png");
  }

  keyPressed() {
    if (keyCode === ARROW_UP) {
      this.jump();
    }
    if (keyCode === SPACE_BAR) {
      this.shootFlecha();
    }
  }
  jump() {
    if (this.jumpCount === 4) {
      return;
    }
    this.top -= 60;
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

  shootFlecha() {
    //const heartLocation = this.cupidoLocation();
    this.flechaArray.push(new Flecha(this.top, this.left));
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
    this.flechaArray.forEach((flecha) => {
      flecha.throwFlecha();
    });
    //cleans flechazos
    this.cleanUp();
  }

  //stop the player on the
  hasReachedTheGround() {
    return this.top >= CANVAS_HEIGHT - this.height;
  }
  // stop the player from the top
  hasReachedThSky() {
    return this.sky >= this.top;
  }

  cleanUp() {
    this.flechaArray = this.flechaArray.filter(
      (flechazo) => flechazo.left <= CANVAS_WIDTH
    );
  }
}
