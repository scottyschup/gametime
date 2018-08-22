(() => {
  class Rainbows {
    constructor (canvasId, numPointers = 1) {
      this.canvas = new Canvas();
      this.pointers = [];
      const startingPosition = { x: this.canvas.width() / 2, y: this.canvas.height() / 2 };
      for (let i = 0; i < numPointers; i++) {
        this.pointers.push(new Pointer(`pointer${i}`, startingPosition));
      }
    }

    movePointers () {
      this.pointers.forEach(pointer => {
        pointer.move();
        this.redirectIfSideCollision(pointer);
      })
    }

    redirectIfSideCollision (pointer) {
      if (pointer.leftSide() <= 0 || pointer.rightSide() >= this.canvas.width()) {
        pointer.direction.x *= -1;
      }
      if (pointer.topSide() <= 0 || pointer.bottomSide() >= this.canvas.height()) {
        pointer.direction.y *= -1;
      }
    }

    render () {
      this.pointers.forEach(pointer => {
        pointer.element.style.left = `${pointer.position.x}px`;
        pointer.element.style.top = `${pointer.position.y}px`;
        this.canvas.drawPointer(pointer.element);
      });
    }

    start () {
      if (this.intervalId) {
        console.log('Rainbows has already been started.')
        return;
      }
      this.intervalId = setInterval(() => {
        this.movePointers();
        this.render();
      }, 60);
    }

    stop () {
      if (!this.intervalId) {
        console.log('Rainbows has not yet been started.')
        return;
      }
      clearInterval(this.intervalId);
    }
  }

  class Pointer {
    constructor (id, startingPosition, diameter) {
      this.diameter = diameter || (Math.random() * 50);
      this.borderWidth = 2;
      this.element = document.createElement('div');
      this.element.id = id;
      this.element.className = 'pointer';
      this.element.style.height = this.element.style.width = `${this.diameter}px`;
      this.element.style.borderRadius = `${this.diameter / 2}px`
      this.position = startingPosition;
      let xDirection = Math.random() >= 0.5 ? 1 : -1;
      let yDirection = Math.random() >= 0.5 ? 1 : -1;
      this.direction = { x: Math.random() * xDirection, y: Math.random() * yDirection };
      this.velocity = 10;
      this.element.style.backgroundColor = this.color = new Color;
    }

    move () {
      const newX = this.position.x + this.direction.x * this.velocity;
      const newY = this.position.y + this.direction.y * this.velocity;
      this.position = { x: newX, y: newY };
    }

    leftSide () {
      return this.position.x;
    }

    rightSide () {
      return this.position.x + this.diameter + 2 * this.borderWidth;
    }

    topSide () {
      return this.position.y;
    }

    bottomSide () {
      return this.position.y + this.diameter + 2 * this.borderWidth;
    }

    updateBackgroundColor () {
      this.color = this.color.updateColor();
      this.element.style.backgroundColor = 'rgb('
    }
  }

  class Canvas {
    constructor (height, width) {
      this.element = document.createElement('div');
      this.element.className = 'canvas';
      this.element.style.height = `${height || window.innerHeight}px`;
      this.element.style.width = `${width ||window.innerWidth}px`;
      document.body.appendChild(this.element);
    }

    height () {
      return Number(this.element.style.height.slice(0, -2));
    }

    width () {
      return Number(this.element.style.width.slice(0, -2));
    }

    drawPointer (pointer) {
      this.element.appendChild(pointer);
    }
  }

  class Color {
    constructor () {
      this.r = Math.round(Math.random() * 255);
      this.g = Math.round(Math.random() * 255);
      this.b = Math.round(Math.random() * 255);
      this.rDirection = Math.random() > 0.5;
      this.gDirection = Math.random() > 0.5;
      this.bDirection = Math.random() > 0.5;
      this.velocity = Math.round(Math.random() * 10);
    }

    updateColor () {
      this.r = this.r * this.rDirection * this.velocity;
    }
  }

  // class Controls {
  //   constructor () {
  //     this.startButton = document.createElement('button');
  //     this.startButton.className = 'start';
  //     this.stopButton = document.createElement('button');
  //     this.stopButton.className = 'stop';
  //   }
  // }

  window.Rainbows = window.Rainbows || Rainbows;
})();