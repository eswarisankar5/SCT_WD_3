const startGameBtn = document.getElementById("startGameBtn");
const welcomeContainer = document.getElementById("welcomeContainer");
const gameContainer = document.getElementById("gameContainer");
const playerNameDisplay = document.getElementById("playerName");
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const gif = document.getElementById("wingif");
const draw = document.getElementById("drawgif");
const gameOver = document.getElementById("GameOver");
const scoreBoardContainer = document.querySelector(".scoreBoardContainer");
const click = document.getElementById("click");

let playerName1 = "";
let playerName2 = "";
let X = 0;
let Y = 0;
let draws = 0;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

startGameBtn.addEventListener("click", askForName);

function askForName() {
    playerName1 = prompt("Player 1 (X):");
    playerName2 = prompt("Player 2 (O):");
    if (playerName1 && playerName2) {
        welcomeContainer.style.display = "none";
        gameContainer.style.display = "block";
        scoreBoardContainer.style.display = "block"; 
        initializeGame();
    }
}

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    running = true;
    updateStatus();
}

function updateStatus() {
    if (currentPlayer === "X") {
        statusText.textContent = `${playerName1}'s turn`; // Corrected here
    } else {
        statusText.textContent = `${playerName2}'s turn`; // Corrected here
    }
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    
    if (options[cellIndex] !== "" || !running) {
        return;
    }
    click.play();
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    updateStatus();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer === "X" ? playerName1 : playerName2} wins!`; // Corrected here
        running = false;
        ShowWinGif();
        gameOver.play();
        if (currentPlayer == "X") {
            X++;
        } else {
            Y++;
        }
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`; // Corrected here
        ShowDrawGif();
        running = false;
        draws++;
    } else {
        changePlayer();
    }
    UpdateScoreboard();
}

function UpdateScoreboard() {
    document.getElementById("scoreX").textContent = `Score X: ${X}`; // Corrected here
    document.getElementById("scoreY").textContent = `Score O: ${Y}`; // Corrected here
    document.getElementById("Draws").textContent = `Draw: ${draws}`; // Corrected here
}

function ShowDrawGif() {
    draw.style.display = "block";
}

function ShowWinGif() {
    gif.style.display = "block";
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    running = true;
    gif.style.display = "none";
    draw.style.display = "none";
    updateStatus();
}
