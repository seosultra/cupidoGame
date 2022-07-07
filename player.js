class Player {
  constructor(livesSpan, scoreSpan) {
    this.left = 50;
    this.top = 0;
    this.width = 95;
    this.height = 95;
    this.velocity = 0;
    this.jumpCount = 0;
    this.movespeed = 5;
    this.sky = 5;
    this.flechaArray = [];
    this.lives = 7;
    this.score = 0;
    this.livesSpan = livesSpan;
    this.scoreSpan = scoreSpan;
  }

  preload() {
    this.img = loadImage("images/cupid.png");
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
    // if (this.jumpCount === 7) {
    //   return;
    // }
    this.top -= 40;
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
    this.flechaArray.push(new Flecha(this.top + 5, this.left + 5));
    flechaSound.play();
    flechaSound.setVolume(0.3);
  }

  drawPlayer() {
    this.scoreSpan.innerText = this.score;
    this.livesSpan.innerText = this.lives;
    this.velocity += GRAVITY;
    this.top += this.velocity;
    image(this.img, this.left, this.top, this.width, this.height);
    if (this.hasReachedTheGround()) {
      this.top = CANVAS_HEIGHT - this.height;
      this.velocity = 0;
      this.jumpCount = 0;
    }
    if (this.hasReachedTheSky()) {
      this.top = 0;
      this.velocity = 0;
    }
    this.flechaArray.forEach((flecha) => {
      flecha.throwFlecha();
    });
    //cleans flechazos
    this.cleanUp();
  }

  //stop the player on the floor
  hasReachedTheGround() {
    return this.top >= CANVAS_HEIGHT - this.height;
  }
  // stop the player on the top
  hasReachedTheSky() {
    return this.top < 0;
  }
  //to clean flechazos
  cleanUp() {
    this.flechaArray = this.flechaArray.filter(
      (flechazo) => flechazo.left <= CANVAS_WIDTH
    );
  }
}
