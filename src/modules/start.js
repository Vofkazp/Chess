import Figure from "./figure";

const figures = [
  {type: 'R', color: 'black', x: 0, y: 0},
  {type: 'N', color: 'black', x: 0, y: 1},
  {type: 'B', color: 'black', x: 0, y: 2},
  {type: 'Q', color: 'black', x: 0, y: 3},
  {type: 'K', color: 'black', x: 0, y: 4},
  {type: 'B', color: 'black', x: 0, y: 5},
  {type: 'N', color: 'black', x: 0, y: 6},
  {type: 'R', color: 'black', x: 0, y: 7},
  {type: 'P', color: 'black', x: 1, y: 0},
  {type: 'P', color: 'black', x: 1, y: 1},
  {type: 'P', color: 'black', x: 1, y: 2},
  {type: 'P', color: 'black', x: 1, y: 3},
  {type: 'P', color: 'black', x: 1, y: 4},
  {type: 'P', color: 'black', x: 1, y: 5},
  {type: 'P', color: 'black', x: 1, y: 6},
  {type: 'P', color: 'black', x: 1, y: 7},
  {type: 'P', color: 'white', x: 6, y: 0},
  {type: 'P', color: 'white', x: 6, y: 1},
  {type: 'P', color: 'white', x: 6, y: 2},
  {type: 'P', color: 'white', x: 6, y: 3},
  {type: 'P', color: 'white', x: 6, y: 4},
  {type: 'P', color: 'white', x: 6, y: 5},
  {type: 'P', color: 'white', x: 6, y: 6},
  {type: 'P', color: 'white', x: 6, y: 7},
  {type: 'R', color: 'white', x: 7, y: 0},
  {type: 'N', color: 'white', x: 7, y: 1},
  {type: 'B', color: 'white', x: 7, y: 2},
  {type: 'Q', color: 'white', x: 7, y: 3},
  {type: 'K', color: 'white', x: 7, y: 4},
  {type: 'B', color: 'white', x: 7, y: 5},
  {type: 'N', color: 'white', x: 7, y: 6},
  {type: 'R', color: 'white', x: 7, y: 7},
]

export default function renderBoard(board) {
  const app = document.querySelector('#app');
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const div = document.createElement('div');
      if ((i + j) % 2 === 0) {
        div.classList.add('cell', 'dark');
      } else {
        div.classList.add('cell');
      }
      app.appendChild(div);
    }
  }
}

export function createFigure(board) {
  figures.forEach((figure) => {
    board[figure.x][figure.y] = new Figure(figure.type, {x: figure.x, y: figure.y}, figure.color);
  })
}