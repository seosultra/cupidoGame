class Flecha {
  constructor(top, left) {
    this.top = top;
    this.left = left;
  }
  throwFlecha() {
    textSize(20);
    text("🏹", this.left, this.top);

    this.left += 1;
  }
}
