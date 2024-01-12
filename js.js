let gameover = false;
let canClick = true;
let playerWinCount = 0;
let computerWinCount = 0;
let clickedImage;
let shoutout = document.querySelector('.shoutout');


// GET computer choice of rock, scissor, or paper
function getComputerChoice() {
    const computerChoice = ["rock", "paper", "scissors"];
    const random = Math.floor(Math.random() * 3);
    return (computerChoice[random]);
}

// GET player's choice from images
const buttons = document.querySelector('#player-images');
buttons.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
        if (!gameover && canClick) {
            clickedImage = e.target;
            clickedImage.classList.toggle("active-image");
            
            let playerChoiceID = clickedImage.id;
            playRound(getComputerChoice(), playerChoiceID);
        }
    }
})

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function updateComputerImg(computer) {
    let computerIMG = document.querySelector('#question');
    computerIMG.src = "img/" + computer + ".png";
    computerIMG.alt = computer;
    computer.width = "110px";
    computer.height = "110px";
}

async function resetElements() {
    await delay(1400);
    clickedImage.classList.remove("active-image");
    shoutout.textContent = "Choose Rock, Paper, or Scissors";
    canClick = true;
}

function updateWinnerText(winner, message) {
    let winnerDeclaration = document.querySelector('.who-wins');
    let winnerDetails = document.querySelector('.how-win');

    winnerDeclaration.textContent = winner;
    winnerDetails.textContent = message;
}

function displayPlayAgainButton() {
    let buttonContainer = document.querySelector('.how-win');
    let playAgainButton = document.createElement('button');
    buttonContainer.appendChild(playAgainButton).classList.add("play-again-button");
    playAgainButton.textContent = "Play again!";

    playAgainButton.addEventListener("click", function(e) {
        resetGame();
    })
}

function resetGame() {
    let playerWinCountDisplay = document.querySelector("#player-win-counter");
    playerWinCount = 0;
    playerWinCountDisplay.textContent = playerWinCount;

    let computerWinCountDisplay = document.querySelector("#computer-win-counter");
    computerWinCount = 0;
    computerWinCountDisplay.textContent = computerWinCount;

    updateWinnerText("", "");
    gameover = false;
    canClick = true;
}

async function playRound(computer, player) {
    canClick = false;

    updateComputerImg("question");
    updateWinnerText("", "");

    shoutout.textContent = "さいしょ　は　ぐー";
    await delay(1800);
    shoutout.textContent = "じゃんけん";
    await delay(800);
    shoutout.textContent = "ぽい！";

    updateComputerImg(computer);

    if (player === computer) {
        updateWinnerText("Draw!", "Try again!");
    } else if ((player === "rock" && computer === "scissors") ||
                (player === "paper" && computer === "rock") ||
                (player === "scissors" && computer === "paper")) {
        
        let playerWinCountDisplay = document.querySelector("#player-win-counter");
        playerWinCount += 1;
        playerWinCountDisplay.textContent = playerWinCount;
        
        if (playerWinCount >= 3) {
            updateWinnerText("Player wins, best 3 out of 5!", "");
            displayPlayAgainButton();
            gameover = true;
        } else {
            updateWinnerText("Player wins!", `${player} beats ${computer}`);
        }
    } else {
        let computerWinCountDisplay = document.querySelector("#computer-win-counter");
        computerWinCount += 1;
        computerWinCountDisplay.textContent = computerWinCount;
        
        if (computerWinCount >= 3) {
            updateWinnerText("Computer wins, best 3 out of 5", "");
            displayPlayAgainButton();
            gameover = true;
        } else {
            updateWinnerText("Computer wins!", `${computer} beats ${player}`);
        }
    }
    resetElements();
}