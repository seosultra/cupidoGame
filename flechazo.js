class Flecha {
  constructor(top, left) {
    this.top = top;
    this.left = left;
    this.height = 27;
    this.width = width;
    this.speed = 5;
    this.devilCollisionFlecha = false;
  }
  throwFlecha() {
    textSize(this.height);
    text("🏹", this.left, this.top, this.height, this.width);

    this.left += 5;
    this.CANVAS_WIDTH -= this.speed;
  }

  //colission between flecha & devil
  //   flechaCollision(devil) {
  //     console.log("Flechazo hit it!");
  //     return (
  //       devil.left < this.left + this.width &&
  //       devil.left + devil.width > this.left &&
  //       devil.top < this.top + this.height &&
  //       devil.height + devil.top > this.top
  //     );
  //   }
}
