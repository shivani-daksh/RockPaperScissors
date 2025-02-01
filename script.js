
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
 const autoButtonText = document.querySelector('.auto-btn');
  if(!isAutoPlaying){
    autoButtonText.innerHTML = 'Stop Play';
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove(); // bcz here the player is computer against itself.
      playGame(playerMove);
     }, 1000);
     isAutoPlaying = true;
  }
  else{
    autoButtonText.innerHTML = 'Auto Play';
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
.addEventListener('click', () =>{
  playGame('Rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () =>{
  playGame('Paper');
});

document.querySelector('.js-scissor-button')
.addEventListener('click', () =>{
  playGame('Scissors');
});

document.body.addEventListener('keydown', (event) => {
if(event.key ==='r'){
  playGame('Rock');
}
else if(event.key ==='p'){
  playGame('Paper');
}
else if(event.key ==='s'){
  playGame('Scissors');
}
});

document.querySelector('.js-reset-btn').addEventListener('click', () => {
  score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
});


document.querySelector('.js-auto-btn').addEventListener('click', () => {
  autoPlay();
});


function playGame(playerMove) {
  const computerMove = pickComputerMove();
  result = "";

  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You Lose.";
    } else if (computerMove === "Paper") {
      result = "You Win.";
    } else if (computerMove === "Scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You Win.";
    } else if (computerMove === "Paper") {
      result = "Tie.";
    } else if (computerMove === "Scissors") {
      result = "You Lose.";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie.";
    } else if (computerMove === "Paper") {
      result = "You Lose.";
    } else if (computerMove === "Scissors") {
      result = "You Win.";
    }
  }

  if (result === "You Win.") {
    score.wins++;
  } else if (result === "You Lose.") {
    score.losses++;
  } else if (result === "Tie.") {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `  you
<img class="move-icon" src="images/${playerMove}.png" >
<img class="move-icon" src="images/${computerMove}.png" >
computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = ` Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }

  return computerMove;
}
