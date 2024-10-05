import {showToMove} from "./show";

let color = 'white';

export default function listener(classBoard) {
  const container = document.querySelector(".container");
  const board = classBoard.getBoard();

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell")) {
      removeGhost();
    }
    if (e.target.classList.contains("figure")) {
      removeGhost();
      const {x, y} = e.target.dataset;
      if (board[x][y].color === color) {
        e.target.classList.add("active");
        showToMove(board[x][y], board);
      }
    }
    if (e.target.classList.contains("ghost") || e.target.classList.contains("kill")) {
      removeGhost();
      const {oldX, oldY, x, y} = e.target.dataset;
      if (e.target.classList.contains("kill")) {
        board[oldX][oldY].changePosition(x, y);
        setTimeout(() => {
          board[x][y].removeFigure(-1, 0);
          classBoard.moveElement(oldX, oldY, x, y);
        }, 500);
      } else {
        board[oldX][oldY].changePosition(x, y);
        classBoard.moveElement(oldX, oldY, x, y);
      }
      color = color === 'black' ? 'white' : 'black';
    }
  })
}

function removeGhost() {
  document.querySelectorAll(".figure").forEach(el => el.classList.remove("active"));
  document.querySelectorAll('.ghost, .kill').forEach(el => el.remove());
}