import { Color } from './color.js';
import { Colorable } from './colorable.js';

export class Circle extends Colorable {
  constructor (id, startingPosition, diameter) {
    super();
    this.diameter = diameter || (Math.random() * 150 + 50);
    this.borderWidth = 2;
    this.element = document.createElement('div');
    this.element.id = id;
    this.element.className = 'circle';
    this.element.style.height = this.element.style.width = `${this.diameter}px`;
    this.element.style.borderRadius = `${this.diameter / 2}px`
    this.position = startingPosition;
    this.direction = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1
    };
    this.velocity = 10;
    this.color = new Color();
    this.updateBackgroundColor();
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
}
