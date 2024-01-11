let gameIsDraw;
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
        clickedImage = e.target;
        let playerChoiceID = clickedImage.id;

        clickedImage.classList.toggle("active-image");

        playRound(getComputerChoice(), playerChoiceID);
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

function resetElements() {
    shoutout.textContent = "Choose Rock, Paper, or Scissors";
    clickedImage.classList.toggle("active-image");
}

function updateWinnerText(winner, message) {
    let winnerDeclaration = document.querySelector('.who-wins');
    let winnerDetails = document.querySelector('.how-win');

    winnerDeclaration.textContent = winner;
    winnerDetails.textContent = message;
}

async function playRound(computer, player) {
    let winner;

    updateComputerImg("question");
    updateWinnerText("", "");

    shoutout.textContent = "さいしょ　は　ぐー";
    await delay(1800);
    shoutout.textContent = "じゃんけん";
    await delay(800);
    shoutout.textContent = "ぽい！";

    updateComputerImg(computer);

    if (player === computer) {
        winner = "draw";
        updateWinnerText("Draw!", "Try again!");

        gameIsDraw = true;
        
        resetElements();
    } else if ((player === "rock" && computer === "scissors") ||
                (player === "paper" && computer === "rock") ||
                (player === "scissors" && computer === "paper")) {
        winner = "player";
        updateWinnerText("Player wins!", `${player} beats ${computer}`);
        
        let playerWinCountDisplay = document.querySelector("#player-win-counter");
        playerWinCount += 1;
        playerWinCountDisplay.textContent = playerWinCount;

        gameIsDraw = false;
        
        resetElements();
    } else {
        winner = "computer";
        updateWinnerText("Computer wins!", `${computer} beats ${player}`);
        
        let computerWinCountDisplay = document.querySelector("#computer-win-counter");
        computerWinCount += 1;
        computerWinCountDisplay.textContent = computerWinCount;

        gameIsDraw = false;
        
        resetElements();
    }
    return winner;
}

function game() {
    // while (playerWin < 3 && computerWin < 3) {
        // Play the game
        let gameWinner = "";
        do {
            let computerSelection = getComputerChoice();
            let playerSelection = getPlayerChoice();

            gameWinner = playRound(computerSelection, playerSelection);
        } while (gameIsDraw);
    }
//     alert(`Best-of-five results:
//             Player: ${playerWin} games won 
//             Computer: ${computerWin} games won`);
// }