export class Color {
  constructor (r, g, b) {
    this.r = r || Math.random() * 255;
    this.g = g || Math.random() * 255;
    this.b = b || Math.random() * 255;
    this.direction = {
      r: Math.abs(Math.random() * 2) - 1,
      g: Math.abs(Math.random() * 2) - 1,
      b: Math.abs(Math.random() * 2) - 1,
    };
    this.velocity = Math.random() * 10 + 2;
  }

  updateColor () {
    const arr = ['r', 'g', 'b'];
    for (let i = 0; i < arr.length; i++) {
      let x = arr[i];
      this[x] = this[x] + this.direction[x] * this.velocity;
      if (this[x] <= 0) {
        this[x] = 0.1;
        this.direction[x] = -this.direction[x];
      } else if (this[x] >= 255) {
        this[x] = 254.9;
        this.direction[x] = -this.direction[x];
      }
    }
    return this;
  }
}
