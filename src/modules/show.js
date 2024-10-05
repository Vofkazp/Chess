export function showToMove(figure, board) {
  const {x, y} = figure.position;
  const color = figure.color;

  const paths = {
    'P': searchPathP,
    'R': searchPathR,
    'B': searchPathB,
    'K': searchPathK,
    'Q': searchPathQ,
    'N': searchPathN
  };

  paths[figure.figure](+x, +y, board, color);
}

function searchPathP(x, y, board, color) {
  const direction = color === 'black' ? 1 : -1;
  const startRow = color === 'black' ? 1 : 6;

  movePawn(x, y, direction, startRow, board, color);
}

function searchPathR(x, y, board, color) {
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  directions.forEach(([dx, dy]) => checkDirection(x, y, dx, dy, board, color));
}

function searchPathB(x, y, board, color) {
  const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  directions.forEach(([dx, dy]) => checkDirection(x, y, dx, dy, board, color));
}

function searchPathK(x, y, board, color) {
  const directions = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [1, -1], [-1, 1], [-1, -1]
  ];
  directions.forEach(([dx, dy]) => checkMove(x, y, dx, dy, board, color));
}

function searchPathQ(x, y, board, color) {
  const directions = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [1, -1], [-1, 1], [-1, -1]
  ];
  directions.forEach(([dx, dy]) => checkDirection(x, y, dx, dy, board, color));
}

function searchPathN(x, y, board, color) {
  const moves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2]
  ];
  moves.forEach(([dx, dy]) => checkMove(x, y, dx, dy, board, color));
}

function movePawn(x, y, direction, startRow, board, color) {
  if (board[x + direction] && board[x + direction][y] === 0) {
    createGhost(x, y, x + direction, y, 'ghost');
    if (x === startRow && board[x + 2 * direction][y] === 0) {
      createGhost(x, y, x + 2 * direction, y, 'ghost');
    }
  }
  checkPawnKill(x, y, direction, board, color);
}

function checkPawnKill(x, y, direction, board, color) {
  if (board[x + direction] && y > 0 && board[x + direction][y - 1] !== 0 && board[x + direction][y - 1].color !== color) {
    createGhost(x, y, x + direction, y - 1, 'kill');
  }
  if (board[x + direction] && y < board[x + direction].length - 1 && board[x + direction][y + 1] !== 0 && board[x + direction][y + 1].color !== color) {
    createGhost(x, y, x + direction, y + 1, 'kill');
  }
}

function checkDirection(x, y, deltaX, deltaY, board, color) {
  let i = x + deltaX;
  let j = y + deltaY;

  while (i >= 0 && i < board.length && j >= 0 && j < board[0].length) {
    if (board[i][j] === 0) {
      createGhost(x, y, i, j, 'ghost');
    } else {
      if (board[i][j].color !== color) {
        createGhost(x, y, i, j, 'kill');
      }
      break;
    }
    i += deltaX;
    j += deltaY;
  }
}

function checkMove(x, y, deltaX, deltaY, board, color) {
  const newX = x + deltaX;
  const newY = y + deltaY;

  if (newX >= 0 && newX < board.length && newY >= 0 && newY < board[0].length) {
    if (board[newX][newY] === 0) {
      createGhost(x, y, newX, newY, 'ghost');
    } else if (board[newX][newY].color !== color) {
      createGhost(x, y, newX, newY, 'kill');
    }
  }
}

function createGhost(oldX, oldY, x, y, type) {
  const addType = type === 'ghost' ? {class: 'ghost', symbol: '&#9675;'} : {class: 'kill', symbol: '&#10006;'};
  const app = document.querySelector('#app');
  const div = document.createElement('div');
  div.classList.add(addType.class);
  div.style.cssText = `--indexX: ${x}; --indexY: ${y};`;
  div.setAttribute('data-old-x', oldX);
  div.setAttribute('data-old-y', oldY);
  div.setAttribute('data-x', x);
  div.setAttribute('data-y', y);
  div.innerHTML = addType.symbol;
  app.appendChild(div);
}