let board = [];
let size = 3;
board.length = size;
let unitLength = 200; // the length of the sigle black
let ai = '×';
let player = 'o';
let currentplayer;
let margin = 120; // the distance from (the bottom of the grill) to (the bottom of the canvas)
let winner;
let gameCount = 0;
let aiCount = 0;
let playerCount = 0;
let tieCount = 0;
let gameFinished = false;

function buildBoard() {
  for (let i = 0; i < 3; ++i) {
    board[i] = ['', '', ''];
  }
  // If there is a winner, the loser starts the next game.
  // Otherwise, order is ramdomly decided
  if (winner == ai) {
    currentplayer = player;
  } else if (winner == player) {
    currentplayer = ai;
  } else {
    currentplayer = random([ai, player]);
  }
  // reset the gameFinished boolean
  currentplayer = random([ai, player]);
  gameFinished = false;
}


function restartGames() {
  winner = NULL;
  buildBoard();
  aiCount = 0;
  playerCount = 0;
  tieCount = 0
}


// create a button to reset the board
function setupButton() {
  let buttonWidth;
  let buttonHeight = unitLength / 3;
  var resetBoardButton = createButton("Reset Board");
  resetBoardButton.position(unitLength, height);
  resetBoardButton.style('width', unitLength + 'px');
  resetBoardButton.style('height', buttonHeight + 'px');
  resetBoardButton.style('font-size', 16 * unitLength / 100 + 'px');
  resetBoardButton.style('background-color', color(25, 23, 200, 50));
  resetBoardButton.mousePressed(buildBoard);

  // create a button to restart the game
  var newGameButton = createButton("New Game");
  newGameButton.position(unitLength, height + buttonHeight);
  newGameButton.style('width', unitLength + 'px');
  newGameButton.style('height', unitLength / 3 + 'px');
  newGameButton.style('font-size', 16 * unitLength / 100 + 'px');
  newGameButton.style('background-color', color(25, 23, 200, 50));
  newGameButton.mousePressed(restartGames);
}


function setup() {
  createCanvas(size * unitLength, size * unitLength + margin);
  // build the game board
  buildBoard();
  // create a button to reset the board
  setupButton();
  // Initializing the gameDisplay
  aiWins = createDiv();
  playerWins = createDiv();
  tie = createDiv();
  totalGame = createDiv();
}


function draw() {
  background(220);
  // draw the board, including the pieces and the grid
  drawBoard();
  // Display the status of the players. i.e. next player/winner/tie
  displayPlayerStatus();
  // Display the status of the game. i.e. × Wins/o Wins/Ties/Total Games
  displayGameStatus();
}


// draw the board, including the pieces and the grid
function drawBoard() {
  // display the content of the board
  for (let i = 0; i < size; ++i) {
    for (let j = 0; j < size; ++j) {
      let spot = board[i][j];
      let x = unitLength * (j + 0.5);
      let y = unitLength * (i + 0.5);
      textSize(68 * (unitLength / 100));
      textAlign(CENTER, CENTER);
      text(spot, x, y);
    }
  }
  // draw the grid
  for (let i = 0; i <= size; ++i) {
    color(20);
    line(0, unitLength * i, unitLength * size, unitLength * i);
  }
  for (let i = 0; i <= size; ++i) {
    color(20);
    line(unitLength * i, 0, unitLength * i, unitLength * size);
  }
}


function displayGameStatus() {
  let x = width + 10;
  let y = unitLength / 3.5;
  textSize(24);
  textAlign(RIGHT, TOP);
  aiWins.html("AI Wins: " + aiCount);
  aiWins.position(x, 10);
  aiWins.style('font-size', 20 * unitLength / 100 + 'px');
  playerWins.html("Player Wins: " + playerCount);
  playerWins.position(x, y);
  playerWins.style('font-size', 20 * unitLength / 100 + 'px');
  tie.html("Ties: " + tieCount);
  tie.position(x, 2 * y);
  tie.style('font-size', 20 * unitLength / 100 + 'px');
  gameCount = aiCount + playerCount + tieCount;
  totalGame.html("Total Games: " + gameCount);
  totalGame.position(x, 3 * y);
  totalGame.style('font-size', 20 * unitLength / 100 + 'px');
}


// Display the winner or tie when the game is over
function displayPlayerStatus() {
  x = width / 2;
  y = height - margin / 2;
  textSize(58 * (margin / 100));
  textAlign(CENTER, CENTER);
  if (checkwinner()) {
    if (winner == 'tie') {
      // print 'tie'
      text('Tie', x, y);
      if (!gameFinished) {
        ++tieCount;
        gameFinished = true;
      }
    } else if (winner == ai) {
      // print the winner
      text('Winner: AI', x, y);
      if (!gameFinished) {
        ++aiCount;
        gameFinished = true;
      }
    } else if (winner == player) {
      text('Winner: You', x, y);
      if (!gameFinished) {
        ++playerCount;
        gameFinished = true;
      }
    }
  } else {
    // print which player should move next
    if (currentplayer == ai) {
      text("Next: AI", x, y);
    } else {
      text("Next: You", x, y);
    }
  }
}


// return the result of "a=b=c"
function tripleEqual(a, b, c) {
  return (a == b && a == c);
}


// check if the board is full
function isfull() {
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      let spot = board[i][j];
      if (spot == '') {
        return false;
      }
    }
  }
  return true;
}


// Check if there is a winner or tie
// return true if the game is over(there is a winner or tie)
// return false otherwise
function checkwinner() {
  for (i = 0; i < size; ++i) {
    // horizontally
    if (tripleEqual(board[i][0], board[i][1], board[i][2]) &&
      board[i][0] != '') {
      winner = board[i][0];
      return true;
    }
    // vertically
    else if (tripleEqual(board[0][i], board[1][i], board[2][i]) &&
      board[0][i] != '') {
      winner = board[0][i];
      return true;
    }
  }
  // diagonally
  if ((tripleEqual(board[0][0], board[1][1], board[2][2]) ||
      tripleEqual(board[0][2], board[1][1], board[2][0])) &&
    board[1][1] != '') {
    winner = board[1][1];
    return true;
  }
  // board is full
  else if (isfull()) {
    winner = 'tie';
    return true;
  }
  return false;
}


// change the content of the board depending on which spot is clicked
// return 2 if a step is made successfully, return 1 otherwise
function playerMove() {
  if (mouseX > 0 && mouseX < unitLength) {
    if (mouseY > 0 && mouseY < unitLength && board[0][0] == '') {
      board[0][0] = player;
      return 2;
    } else if (mouseY > unitLength && mouseY < 2 * unitLength && board[1][0] == '') {
      board[1][0] = player;
      return 2;
    } else if (mouseY > 2 * unitLength && mouseY < 3 * unitLength && board[2][0] == '') {
      board[2][0] = player;
      return 2;
    }
  } else if (mouseX > unitLength && mouseX < 2 * unitLength) {
    if (mouseY > 0 && mouseY < unitLength && board[0][1] == '') {
      board[0][1] = player;
      return 2;
    } else if (mouseY > unitLength && mouseY < 2 * unitLength && board[1][1] == '') {
      board[1][1] = player;
      return 2;
    } else if (mouseY > 2 * unitLength && mouseY < 3 * unitLength && board[2][1] == '') {
      board[2][1] = player;
      return 2;
    }
  } else if (mouseX > 2 * unitLength && mouseX < 3 * unitLength) {
    if (mouseY > 0 && mouseY < unitLength && board[0][2] == '') {
      board[0][2] = player;
      return 2;
    } else if (mouseY > unitLength && mouseY < 2 * unitLength && board[1][2] == '') {
      board[1][2] = player;
      return 2;
    } else if (mouseY > 2 * unitLength && mouseY < 3 * unitLength && board[2][2] == '') {
      board[2][2] = player;
      return 2;
    }
  }
  return 1;
}


function bestMove(board) {
  let bestScore = -Infinity;
  let Move;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] == '') {
        board[i][j] = ai;
        let score = minimax(board, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          Move = { i, j };
        }
      }
    }
  }
  board[Move.i][Move.j] = ai;
}


function minimax(board, isAITurn) {
  if (checkwinner()) {
    return (winner == ai) ? 1 :
      (winner == player) ? -1 :
      0;
  }
  if (isAITurn) {
    let bestScore = -Infinity;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, false);
          board[i][j] = '';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (board[i][j] == '') {
          board[i][j] = player;
          let score = minimax(board, true);
          board[i][j] = '';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

// make the move
function mousePressed() {
  if (!checkwinner()) {
    if (currentplayer == player) {
      let a = playerMove();
      // switch roles only if a placement was made successfully
      if (a == 2) {
        currentplayer = ai;
      }
    } else {
      bestMove(board);
      currentplayer = player;
    }
  }
}