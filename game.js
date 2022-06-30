class Game {
  constructor() {
    this.player = new Player();
    this.background = new Background();
    this.lovestorm = new Lovestorm();
    this.devils = [];
    this.flechas = [];
  }

  preload() {
    this.player.preload();
    this.background.preload();
  }

  play() {
    this.player.move();
    this.background.drawBackground();
    this.player.drawPlayer();
    this.lovestorm.draw();
    keyPressed() {
        this.player.keyPressed();
      }
    if (frameCount % 70 === 0) {
      this.devils.push(new Devil());
    }
    this.devils.forEach((devil) => {
      devil.draw();
      return devil.left >= -devil.width;
    });
    this.devils = this.devils.filter((devil) => {
      devil.draw();
      return devil.left >= -devil.width;
    });
   
    // collision between devil & flecha
    isDeCollidingFlecha() {
        this.devils.forEach((devil, index) => {
            if (flechas.flechaCollision(this.flechas)) {
                this.player.score++;
              }
        });}
 
  //collision between  devil & player. G.
  isDeCollidingCupido() {
    this.devils.forEach((devil, index) => {
      if (devil.devilCollision(this.player)) {
        this.player.lives--;
      }
    });
  }
  //collision between devil and lovestorm
  isDeCollidingStorm() {
    this.lovestorm.forEach((lovestorm, index) => {
      if (lovestorm.obstacleCollision(this.devils)) {
        this.devil.draw.text("🥰​", devil.left, devil.top, devil.width, devil.height);
      }
    });
  }
  }
  //collision between the devil & 
  // we want to check wether the player it colliding with the devil
  // conditions for true collision
  // Bottom of A >= Top of B
  // Top of A <= Bottom of B
  // Left of A <= Right of B
  // Right of A >= Left of B

  // for sake of argument, lets say devil is A and flecha is B

  // var devil = {this.devil.top, devil.left, devil.height,

  // const bottomOfA = devil.top + devil.height;
  // const topOfB = Devils.top;
  // const isBottomOfABiggerThenTopOfB = bottomOfA >= topOfB;

  // const topOfA = devil.top;
  // const bottomOfB = Devils.height + Devils.top;

  // const isTopOfASmallerThanBottomOfB = topOfA <= bottomOfB;

  // const leftOfA = devil.left;
  // const rightOfB = Devils.left + Devils.width;
  // const isLeftOfASmallerThanRightOfB = leftOfA <= rightOfB;

  // const rightOfA = devil.width + devil.left;
  // const leftOfB = Devils.left;
  // const isRightOfABiggerThanLeftOfB = rightOfA >= leftOfB;

  // return (
  //   isBottomOfABiggerThenTopOfB &&
  //   isTopOfASmallerThanBottomOfB &&
  //   isLeftOfASmallerThanRightOfB &&
  //   isRightOfABiggerThanLeftOfB
  // );
}
