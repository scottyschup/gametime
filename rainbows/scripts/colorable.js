export class Colorable {
  updateBackgroundColor () {
    this.color.updateColor();
    this._backgroundColor(this.color);
  }

  _backgroundColor (color) {
    this.element.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
  }
}
