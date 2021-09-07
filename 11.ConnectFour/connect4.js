// notes: changed var to const or let(mostly inside for() functions)
// changed WIDTH and HEIGHT to boardWidth / boardHeight for easier identification
// changed board to gameBoard for easier identification
// added notes for solution pulls
// modified CSS to use updated variable names and added border-radius to make the gamePiece round

const boardWidth = 7;
const boardHeight = 6;

let currPlayer = 1; // active player: 1 or 2
let gameBoard = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let y = 0; y < boardHeight; y++) {
    gameBoard.push(Array.from({ length: boardWidth }));  //pulled array.from({}) from solution, not sure I understand how it identified length as an actual length attribute and not as a generic [key] to reference.  (ie title: boardWidth doesn't work but length: does.  how/why?  tried using something like boardWidth.push(...gameBoard), thinking it would [,,,,,,])
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  const gameBoard = document.getElementById('board');
  // create top row for event handling
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < boardWidth; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  gameBoard.append(top);

  // create rows for gameBoard
  for (let y = 0; y < boardHeight; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < boardWidth; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    gameBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  for (let y = boardHeight - 1; y >= 0; y--){
    if(!gameBoard[y][x]){  //if statement modified from solution
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  const gamePiece = document.createElement('div')
  gamePiece.classList.add('gamePiece');
  gamePiece.classList.add(`p${currPlayer}`);
  
  const boardSpot = document.getElementById(`${y}-${x}`);
  boardSpot.append(gamePiece);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  gameBoard[y][x] = currPlayer;  //Pulled from solution
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (gameBoard.every(row => row.every(cell => cell))){  //modified from solution
    return endGame('Tie!');
  }
  

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < boardHeight &&
        x >= 0 &&
        x < boardWidth &&
        gameBoard[y][x] === currPlayer
    );
  }

  // Identify piece placement and increment to win total

  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
