class Game {
  constructor() {
    this.player = new Player(livesSpan, scoreSpan);
    this.background = new Background();
    //  this.lovestorm = new Lovestorm();
    this.devils = [];
    //this.score = 0;
    //this.lives = 7;
    this.flechas = [];
    this.stormArray = [];
  }

  createParticle() {
    this.stormArray.push(new LoveItem());
  }

  preload() {
    this.player.preload();
    this.background.preload();
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
    //livesSpan.innerText = `${this.player.lives} `;
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
        }
      });

      this.player.flechaArray.forEach((flecha) => {
        if (this.isCollisionBetweenTwoElements(flecha, devil)) {
          devil.flechaCollisionDevil = true;
        }
        this.player.score++;
        //scoreSpan = `${this.player.score} points`;
      });
    });

    this.devils = this.devils.filter((devil) => {
      devil.draw();
      return devil.left >= -devil.width && !devil.flechaCollisionDevil;
    });

    this.stormArray = this.stormArray.filter((item) => {
      item.draw();
      return item.top <= CANVAS_HEIGHT;
    });
    // game lost
    if (this.player.lives === 0) {
      console.log("Game Over");
      stop();
    }
    // won the game
    if (this.player.score === 100) {
      console.log("You win!");
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
