import { Canvas } from './canvas.js';
import { Color } from './color.js';
import { Circle } from './circle.js';

export class Rainbows {
  constructor (canvasId, numCircles = 100) {
    this.canvas = new Canvas();
    this.circles = [];
    this.intervalId = null;
    this.fps = 40;
    const startingPosition = { x: this.canvas.width() / 2, y: this.canvas.height() / 2 };
    for (let i = 0; i < numCircles; i++) {
      let diameter = Math.random() * Math.random() * 150 + 20;
      this.circles.push(new Circle(`circle${i}`, startingPosition, diameter));
    }
  }

  mss () {
    this.fps = Math.round(this.fps);
    return 1000 / +this.fps;
  }

  moveCircles () {
    this.circles.forEach(circle => {
      circle.updateBackgroundColor();
      circle.move();
      this.redirectIfSideCollision(circle);
    })
  }

  redirectIfSideCollision (circle) {
    if (circle.leftSide() <= 0 || circle.rightSide() >= this.canvas.width()) {
      circle.direction.x *= -1;
    }
    if (circle.topSide() <= 0 || circle.bottomSide() >= this.canvas.height()) {
      circle.direction.y *= -1;
    }
  }

  render () {
    this.circles.forEach(circle => {
      circle.element.style.left = `${circle.position.x}px`;
      circle.element.style.top = `${circle.position.y}px`;
      this.canvas.drawCircle(circle.element);
    });
  }

  start () {
    if (this.intervalId) {
      console.log('Rainbows has already been started.')
      return;
    }
    this.intervalId = setInterval(() => {
      try {
        const playButton = document.getElementById('play-button');
        const controls = document.getElementById('controls');
        controls.classList.add('fadeout');
        this.moveCircles();
        this.canvas.updateBackgroundColor();
        this.updateRGB(this.canvas.color);
        this.render();
      } catch (e) {
        this.stop();
        console.error(e);
      }
    }, this.mss());
  }

  stop () {
    if (!this.intervalId) {
      console.log('Rainbows has not yet been started.')
      return;
    }
    clearInterval(this.intervalId);
    window.Rbs.playButton.classList.remove('fadeout');
    this.intervalId = null;
  }

  restart () {
    this.stop();
    this.start();
  }

  changeSpeed (delta) {
    if (this.fps < 1) return this.fps = 1;
    if (this.fps > 150) return this.fps = 150;
    const multiplier = 1 + (delta / 100);
    this.fps = Math.round(this.fps * multiplier);
    this.restart();
  }

  updateRGB (color) {
    const colorR = document.getElementById('color-r');
    const colorG = document.getElementById('color-g');
    const colorB = document.getElementById('color-b');
    colorR.innerHTML = Math.round(color.r);
    colorG.innerHTML = Math.round(color.g);
    colorB.innerHTML = Math.round(color.b);
  }
}

// window.Rainbows = window.Rainbows || Rainbows;
