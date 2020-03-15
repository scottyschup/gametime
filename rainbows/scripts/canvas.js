import { Color } from './color.js';
import { Colorable } from './colorable.js';

export class Canvas extends Colorable {
  constructor (height, width) {
    super();
    this.element = document.createElement('div');
    this.element.className = 'canvas';
    this.element.style.height = `${height || window.innerHeight}px`;
    this.element.style.width = `${width ||window.innerWidth}px`;
    this.color = new Color(0, 0, 0);
    document.body.appendChild(this.element);
  }

  height () {
    return Number(this.element.style.height.slice(0, -2));
  }

  width () {
    return Number(this.element.style.width.slice(0, -2));
  }

  drawCircle (circle) {
    this.element.appendChild(circle);
  }
}
