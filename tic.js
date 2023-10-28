document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const cells = [];
    const container = document.querySelector('.container');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    const newGameButton = document.getElementById('newGameButton');
    let currentPlayer = 'X';
    // let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                message.innerText = `${currentPlayer} wins!`;
                gameOver = true;
                showPopup(`${currentPlayer} wins!`);
                return;
            }
        }

        if (!gameBoard.includes('')) {
            message.innerText = 'It\'s a draw!';
            gameOver = true;
            showPopup('It\'s a draw!');
        }
    }

    function cellClick(index) {
        if (!gameOver && !gameBoard[index]) {
            gameBoard[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.innerText = `${currentPlayer}'s turn`;
            checkWinner();
        }
    }

    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        message.innerText = `${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
        container.classList.remove('end-game');
        hidePopup();
    }

    function showPopup(message) {
        popupMessage.innerText = message;
        popup.style.display = 'flex';
    }

    function hidePopup() {
        popup.style.display = 'none';
    }

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => cellClick(i));
        cells.push(cell);
        board.appendChild(cell);
    }

    resetButton.addEventListener('click', resetGame);
    newGameButton.addEventListener('click', resetGame);

    resetGame();
});
