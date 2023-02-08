let board = ["", "", "", "", "", "", "", "", ""];

let playerTime = 0;

let gamerOver = false;

let symbol = ["o", "x"];

const winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const isWin = () => {
  for (let i = 0; i < winStates.length; i++) {
    let sequence = winStates[i];

    let position1 = sequence[0];
    let position2 = sequence[1];
    let position3 = sequence[2];

    if (
      board[position1] == board[position2] &&
      board[position1] == board[position3] &&
      board[position1] != ""
    ) {
      return true;
    }
  }
  return false;
};

const handleMove = (positon) => {
  if (gamerOver) {
    return;
  }

  if (board[positon] == "") {
    board[positon] = symbol[playerTime];

    gamerOver = isWin();

    if (!gamerOver) {
      playerTime = playerTime == 0 ? 1 : 0;
    }
  }
  return gamerOver;
};

let squares = document.querySelectorAll(".square");

const reset = document.getElementById("clear");

const handleClick = (event) => {
  let positon = event.target.id;

  if (handleMove(positon)) {
    setTimeout(() => {
      alert("THE GAME IS OVER - winner was " + playerTime);
    }, 30);
  }
  updateSquares();
};

const updateSquares = () => {
  squares = document.querySelectorAll(".square");

  squares.forEach((square) => {
    let positon = square.id;
    let symbol = board[positon];

    if (symbol != "") {
      square.innerHTML = `<div class='${symbol}'></div>`;
    }
    const clear = () => {
      board = ["", "", "", "", "", "", "", "", ""];
      playerTime = 0;

      gamerOver = false;

      square.innerHTML = "";
    };

    reset.addEventListener("click", clear);
  });
};

squares.forEach((square) => {
  square.addEventListener("click", handleClick);
});
