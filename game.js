class Game {
  constructor() {
    this.player = new Player();
    this.obstacles = [];
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
    //this.flechazo.draw();

    if (frameCount % 120 === 0) {
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

    if (frameCount % 80 === 0) {
      this.obstacles.push(new Obstacle());
    }
    this.obstacles = this.obstacles.filter((obstacle) => {
      obstacle.drawObstacle();
      return obstacle.left >= -obstacle.width;
    });
    // this.devilstorm.stormArray.forEach((item) => {
    //   if (this.isColliding(this.player, item)) {
    //     this.devilstorm.stormArray = this.devilstorm.stormArray.filter(
    //       (element) => {
    //         return element != item;
    //       }
    //     );
    //   }
    // });

    // obstacle is an array. look at what you were doing above (for Each) and use that on this.obstacleS. there is no this.obstacle
    if (this.isColliding(this.player, this.obstacles)) {
      this.obstacles.resetTopAndLeft();
      this.player.score++;
    }
  }
  keyPressed() {
    this.player.keyPressed();
  }

  isColliding() {
    this.devils.forEach((devil, index) => {
      if (devil.devilCollision(this.player)) {
        this.player.score--;
      }
    });
    // we want to check wether the player it colliding with the obstacle
    // conditions for true collision
    // Bottom of A >= Top of B
    // Top of A <= Bottom of B
    // Left of A <= Right of B
    // Right of A >= Left of B

    // for sake of argument, lets say player is A and obstacle is B

    // var player = {this.player.top, player.left, player.height, player.width}
    // var obstacle = {x: 20, y: 10, w: 60, h: 40}
    // var devil =

    // var rect1 = Crafty.e("2D, Canvas, Color").attr(dim1).color("red");

    // var rect2 = Crafty.e("2D, Canvas, Color, Keyboard, Fourway").fourway(2).attr(dim2).color("blue");

    // rect2.bind("EnterFrame", function () {
    //     if (rect1.x < rect2.x + rect2.w &&
    //         rect1.x + rect1.w > rect2.x &&
    //         rect1.y < rect2.y + rect2.h &&
    //         rect1.h + rect1.y > rect2.y) {
    //         // collision detected!
    //         this.color("green");
    //     } else {
    //         // no collision
    //         this.color("blue");
    //     }
    // });

    // const bottomOfA = player.top + player.height;
    // const topOfB = Devils.top;
    // const isBottomOfABiggerThenTopOfB = bottomOfA >= topOfB;

    // const topOfA = player.top;
    // const bottomOfB = Devils.height + Devils.top;

    // const isTopOfASmallerThanBottomOfB = topOfA <= bottomOfB;

    // const leftOfA = player.left;
    // const rightOfB = Devils.left + Devils.width;
    // const isLeftOfASmallerThanRightOfB = leftOfA <= rightOfB;

    // const rightOfA = player.width + player.left;
    // const leftOfB = Devils.left;
    // const isRightOfABiggerThanLeftOfB = rightOfA >= leftOfB;

    // return (
    //   isBottomOfABiggerThenTopOfB &&
    //   isTopOfASmallerThanBottomOfB &&
    //   isLeftOfASmallerThanRightOfB &&
    //   isRightOfABiggerThanLeftOfB
    // );
  }
}
