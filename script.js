const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const winningMessageText = document.querySelector(".message-text");
const message = document.querySelector(".message");
const restartButton = document.querySelector(".btn-restart");
const O_CLASS = "o";
const X_CLASS = "x";
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [2, 5, 8],
  [1, 4, 7],
  [2, 4, 6],
];

let o_turn;

startGame();
restartButton.addEventListener("click", startGame);

function startGame() {
  o_turn = false;
  cells.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  message.classList.remove("show");
  setBoardHoverClass();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = o_turn ? O_CLASS : X_CLASS;

  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = "Draw!";
  } else {
    winningMessageText.innerText = `${o_turn ? "O player" : "X player"} wins!`;
  }
  message.classList.add("show");
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurn() {
  o_turn = !o_turn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);

  const setHover = o_turn
    ? board.classList.add(O_CLASS)
    : board.classList.add(X_CLASS);
  return setHover;
}

function checkWin(currentClass) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}
