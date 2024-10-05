export class Board {
  constructor() {
    this.board = Array.from({ length: 8 }, () => new Array(8).fill(0));
  }

  getBoard() {
    return this.board;
  }

  moveElement(oldX, oldY, x, y) {
    this.board[x][y] = this.board[oldX][oldY];
    this.board[oldX][oldY] = 0;
  }
}