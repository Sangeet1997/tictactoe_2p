
const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const winModal = document.getElementById('winModal');
const winMessage = document.getElementById('winMessage');
let currentPlayer = 'X';
let gameActive = true;

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
    if (!gameActive) return;
    
    const cell = e.target;
    cell.textContent = currentPlayer;
    
    if (checkWin()) {
        gameActive = false;
        showWinMessage(`Player ${currentPlayer} Wins!`);
    } else if (checkDraw()) {
        gameActive = false;
        showWinMessage("It's a Draw!");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `${currentPlayer}`;
    }
}

function checkWin() {
    return winCombos.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function showWinMessage(message) {
    winMessage.textContent = message;
    winModal.style.display = 'flex';
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = `${currentPlayer}`;
    winModal.style.display = 'none';
}