class Game {
  constructor() {
    this.player = new Player();
    this.background = new Background();
    this.lovestorm = new Lovestorm();
    this.devils = [];
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

    // obstacle is an array. look at what you were doing above (for Each) and use that on this.obstacleS. there is no this.obstacle
    if (this.isColliding(this.player, this.obstacles)) {
      this.obstacles.resetTopAndLeft();
      this.player.score++;
    }
  }
  keyPressed() {
    this.player.keyPressed();
  }
  //collision between the devil and the player
  isColliding() {
    this.devils.forEach((devil, index) => {
      if (devil.devilCollision(this.player)) {
        this.player.score--;
      }
    });
  }
  //collision between devil and lovestorm
  isDevilCollidingStorm() {
    this.lovestorm.forEach((lovestorm, index) => {
      if (lovestorm.obstacleCollision(this.devils)) {
        this.devils.draw("🥰​");
      }
    });
  }
  // we want to check wether the player it colliding with the obstacle
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
