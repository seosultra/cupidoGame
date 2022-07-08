class Game {
  constructor() {
    this.player = new Player(livesSpan, scoreSpan);
    this.background = new Background();
    this.devils = [];
    this.flechas = [];
    this.stormArray = [];
    this.gameOver = false;
    this.gameWon = false;
  }

  createParticle() {
    this.stormArray.push(new LoveItem());
  }

  preload() {
    this.player.preload();
    this.background.preload();
    backgroundMusic = loadSound("images/Flying.mp3");
    flechaSound = loadSound("/images/flecha.mp3");
    devilSound = loadSound("images/devil.mp3");
    heartSound = loadSound("images/heart.mp3");
    gameOverImage = loadImage("images/gameOv.jpeg");
    gameWonImage = loadImage("images/wonG.jpeg");
  }

  createStuff() {
    if (frameCount % 70 === 0) {
      this.devils.push(new Devil());
    }

    if (frameCount % 240 === 0) {
      this.createParticle();
    }
  }

  devilHitsCupido(player, devil) {
    if (devil.hasHitPoorCupido || devil.hasBeenHitByLove) {
      return;
    }
    player.lives--;

    devil.hasHitPoorCupido = true;
  }

  devilGetsHitByLove(devil) {
    if (devil.hasBeenHitByLove) {
      return;
    }

    devil.hasBeenHitByLove = true;
  }

  play() {
    this.player.move();
    this.background.drawBackground();
    this.player.drawPlayer();
    this.createStuff();

    this.devils.forEach((devil) => {
      // first we check cupido vs devil
      if (this.isCollisionBetweenTwoElements(this.player, devil)) {
        this.devilHitsCupido(this.player, devil);
      }

      this.stormArray.forEach((heart) => {
        if (this.isCollisionBetweenTwoElements(heart, devil)) {
          this.devilGetsHitByLove(devil);
          heartSound.play();
          heartSound.setVolume(0.3);
        }
      });

      this.player.flechaArray.forEach((flecha) => {
        if (this.isCollisionBetweenTwoElements(flecha, devil)) {
          devil.flechaCollisionDevil = true;
          this.player.score++;
          devilSound.play();
          devilSound.setVolume(0.3);
        }
      });
    });

    this.devils = this.devils.filter((devil) => {
      devil.draw();
      return devil.left >= -devil.width && !devil.flechaCollisionDevil;
      //return !devil.flechaCollisionDevil;
    });

    this.stormArray = this.stormArray.filter((item) => {
      item.draw();
      return item.top <= CANVAS_HEIGHT;
    });
    // game lost
    if (this.player.lives === 0) {
      this.gameOver = true;
      setTimeout(function () {
        //to restart the game
        location.reload();
      }, 2500);
      //console.log("Game Over");
    }
    // won the game
    if (this.player.score === 5) {
      //console.log("You win!");
      this.gameWon = true;
      setTimeout(function () {
        location.reload();
      }, 2500);
    }
    if (this.gameOver) {
      setTimeout(function () {
        image(gameOverImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        noLoop();
      }, 300); //mileseconds
    }
    if (this.gameWon) {
      setTimeout(function () {
        image(gameWonImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        noLoop();
      }, 300);
    }
  }
  keyPressed() {
    this.player.keyPressed();
  }
  isCollisionBetweenTwoElements(goodThing, devil) {
    const bottomOfGoodThing = goodThing.top + goodThing.height;
    const topOfDevil = devil.top;

    const isBottomOfGoodThingBiggerThanTopOfDevil =
      bottomOfGoodThing > topOfDevil;

    const topOfGoodThing = goodThing.top;
    const bottomOfDevil = devil.top + devil.height;

    const isTopOfGoodThingSmallerThanBottomOfDevil =
      topOfGoodThing <= bottomOfDevil;

    const leftOfGoodThing = goodThing.left;
    const rightOfDevil = devil.left + devil.width;

    const isLeftOfGoodThingSmallerThanRightOfDevil =
      leftOfGoodThing <= rightOfDevil;

    const rightOfGoodThing = goodThing.left + goodThing.width;
    const leftOfDevil = devil.left;

    const isRightOfGoodThingBiggerThanLeftOfDevil =
      rightOfGoodThing >= leftOfDevil;

    return (
      isBottomOfGoodThingBiggerThanTopOfDevil &&
      isTopOfGoodThingSmallerThanBottomOfDevil &&
      isLeftOfGoodThingSmallerThanRightOfDevil &&
      isRightOfGoodThingBiggerThanLeftOfDevil
    );
  }
}
