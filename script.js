const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'player';
let autoResetTimer = null; 

document.getElementById('mode-select-form').addEventListener('change', () => {
  gameMode = document.querySelector('input[name="mode"]:checked').value;
  resetGame();
});

cells.forEach(cell => {
  cell.addEventListener('click', () => handleClick(cell));
});

function handleClick(cell) {
  const index = cell.dataset.index;

  if (!gameActive || cell.textContent !== '') return;

  cell.textContent = currentPlayer;

  if (checkWin()) {
    message.textContent = `${currentPlayer} Wins!`;
    gameActive = false;
    clearTimeout(autoResetTimer);
    autoResetTimer = null;
    animateWin();
    setTimeout(resetGame, 2000);
    return;
  }

  if (isDraw()) {
    message.textContent = "It's a Draw!";
    gameActive = false;
    clearTimeout(autoResetTimer);
    autoResetTimer = null;
    setTimeout(resetGame, 2000);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (gameMode === 'computer' && currentPlayer === 'O') {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  if (!gameActive) return;

  let emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
  if (emptyCells.length === 0) return;

  let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = 'O';

  if (checkWin()) {
    message.textContent = 'O Wins!';
    gameActive = false;
    clearTimeout(autoResetTimer);
    autoResetTimer = null;
    animateWin();
    setTimeout(resetGame, 2000);
    return;
  }

  if (isDraw()) {
    message.textContent = "It's a Draw!";
    gameActive = false;
    clearTimeout(autoResetTimer);
    autoResetTimer = null;
    setTimeout(resetGame, 2000);
    return;
  }

  currentPlayer = 'X';
}

function checkWin() {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return combos.some(combo => {
    const [a, b, c] = combo;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].classList.add('pop');
      cells[b].classList.add('pop');
      cells[c].classList.add('pop');
      return true;
    }
    return false;
  });
}

function isDraw() {
  return Array.from(cells).every(cell => cell.textContent !== '');
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('pop');
  });
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = '';

  
  if (autoResetTimer) {
    clearTimeout(autoResetTimer);
    autoResetTimer = null;
  }

  autoResetTimer = setTimeout(() => {
    if (gameActive) {
      gameActive = false;
      message.textContent = "Auto-resetting game after 30 seconds of inactivity.";
      setTimeout(resetGame, 1000); 
    }
  }, 30000);
}

function animateWin() {
  
}
