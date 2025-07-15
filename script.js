let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

boardElement.addEventListener('click', handleCellClick);
document.getElementById('reset').addEventListener('click', resetGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const index = clickedCell.getAttribute('data-index');

    if (!gameActive || gameBoard[index] !== '' || !clickedCell.classList.contains('cell')) {
        return;
    }

    gameBoard[index] = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
        messageElement.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
    });
}
