export default class Figure {
  constructor(figure, position, color) {
    this.figure = figure;
    this.position = position;
    this.color = color;
    this.image = figures[color][figure];
    this.element = this.createElement();
  }

  changePosition(x, y) {
    this.position = {x, y};
    this.moveFigure(x, y);
  }

  createElement() {
    const app = document.querySelector('#app');
    const div = document.createElement('div');
    div.classList.add('figure', this.color);
    div.style.cssText = `--indexX: ${this.position.x}; --indexY: ${this.position.y};`;
    div.setAttribute('data-x', this.position.x);
    div.setAttribute('data-y', this.position.y);
    div.innerHTML = this.image;
    app.appendChild(div);
    return div;
  }

  moveFigure(x, y) {
    this.element.dataset.x = x;
    this.element.dataset.y = y;
    this.element.style.cssText = `--indexX: ${x}; --indexY: ${y};`;
  }

  removeFigure(x, y) {
    this.changePosition(x, y);
    setTimeout(() => {
      this.element.remove();
      this.figure = undefined;
      this.position = undefined;
      this.color = undefined;
      this.image = undefined;
    }, 500);
  }
}

const figures = {
  white: {R: '&#9814;', N: '&#9816;', B: '&#9815;', Q: '&#9813;', K: '&#9812;', P: '&#9817;'},
  black: {R: '&#9820;', N: '&#9822;', B: '&#9821;', Q: '&#9819;', K: '&#9818;', P: '&#9823;'}
};