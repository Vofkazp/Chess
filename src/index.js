import './index.scss';
import {Board} from "./modules/board";
import renderBoard, {createFigure} from "./modules/start";
import listener from "./modules/listener";

const classBoard = new Board();
const board = classBoard.getBoard();
renderBoard(board);
createFigure(board);
listener(classBoard);