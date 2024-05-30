const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

let board;
let turn;
let winner;
let tie;

const updateMessage = () => {
  let message;
  if (!winner && !tie) {
    message = turn;
    messageEl.innerHTML = message;
    return;
  }
  if (!winner && tie) {
    message = "game over";
    messageEl.innerHTML = message;
    return;
  }
  message = "congragualtions to" + " " + turn;
  messageEl.innerHTML = message;
};

const updateBoard = () => {
  board.forEach((value, index) => {
    squareEls[index].innerHTML = value;
  });
};

const render = () => {
  updateBoard();
  updateMessage();
};

const init = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  render();
};
init();

squareEls.forEach((square) => {
  square.addEventListener("click", handleClick);
});

function handleClick(event) {
  const squareIndex = event.target.id;
  if (winner || board[squareIndex] !== "") {
    return;
  }
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function placePiece(index) {
  board[index] = turn;
}

function checkForWinner() {
  winningCombos.forEach((combination) => {
    if (
      board[combination[0]] !== "" &&
      board[combination[0]] === board[combination[1]] &&
      board[combination[0]] === board[combination[2]]
    ) {
      winner = true;
    }
  });
}

function checkForTie() {
  if (winner) {
    return;
  }

  if (board.includes("")) {
    tie = false;
  } else {
    tie = true;
  }
}

function switchPlayerTurn() {
  if (winner) {
    return;
  }
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }
}
resetBtnEl.addEventListener("click", init);
