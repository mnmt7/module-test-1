const header = document.querySelector("header");
const playerScoreEl = document.querySelector(".player-score");
const compScoreEl = document.querySelector(".comp-score");
const playBtns = document.querySelector(".play-btns");
const fistBtn = document.querySelector(".fist-btn");
const scissorsBtn = document.querySelector(".scissors-btn");
const handBtn = document.querySelector(".hand-btn");
const resultContainer = document.querySelector(".result-container");
const playerChoiceContainer = document.querySelector(".player-choice");
const compChoiceContainer = document.querySelector(".comp-choice");
const resultMessagePrimaryEl = document.querySelector(
  ".result-message-primary"
);
const resultMessageSecondaryEl = document.querySelector(
  ".result-message-secondary"
);
const resultPlayAgainBtn = document.querySelector(".result-play-again-btn");
const playAgainBtns = document.querySelectorAll(".play-again-btn");
const rulesOpenBtn = document.querySelector(".rules-btn");
const rulesCloseBtn = document.querySelector(".close-btn");
const rulesEl = document.querySelector(".game-rules-container");
const nextBtn = document.querySelector(".next-btn");
const winnerEl = document.querySelector(".winner-container");

const choices = ["fist", "scissors", "hand"];
const choicesEl = {
  fist: [fistBtn.cloneNode(true), fistBtn.cloneNode(true)],
  scissors: [scissorsBtn.cloneNode(true), scissorsBtn.cloneNode(true)],
  hand: [handBtn.cloneNode(true), handBtn.cloneNode(true)],
};

let playerScore = Number(localStorage.getItem("player"));
let compScore = Number(localStorage.getItem("comp"));
let winner = -1; // -1 -> no winner yet, 0 -> tie, 1 -> player, 2 -> computer
let playerChoice, compChoice;

updateScores();

playBtns.addEventListener("click", function (e) {
  const clicked = e.target.closest(".play-btn");
  if (!clicked || clicked.tagName !== "BUTTON") return;

  playerChoice = choices[Number(clicked.dataset.choice)];
  compChoice = choices[Math.floor(Math.random() * 3)];

  computeResult();
  updateScores();
  declareResult();
});

playAgainBtns.forEach((playAgainBtn) =>
  playAgainBtn.addEventListener("click", reset)
);

rulesOpenBtn.addEventListener("click", function () {
  rulesEl.classList.remove("hidden");
});

rulesCloseBtn.addEventListener("click", function () {
  rulesEl.classList.add("hidden");
});

nextBtn.addEventListener("click", function () {
  resultContainer.classList.add("hidden");
  header.classList.add("hidden");
  rulesEl.classList.add("hidden");
  this.classList.add("hidden");

  winnerEl.classList.remove("hidden");
});

function computeResult() {
  if (playerChoice === compChoice) {
    winner = 0;
  } else if (
    (playerChoice === "fist" && compChoice === "scissors") ||
    (playerChoice === "scissors" && compChoice === "hand") ||
    (playerChoice === "hand" && compChoice === "fist")
  ) {
    winner = 1;
    playerScore++;
  } else {
    compScore++;
    winner = 2;
  }
}

function declareResult() {
  if (winner === -1) return;

  let playerChoiceEl = choicesEl[playerChoice][0];
  let compChoiceEl = choicesEl[compChoice][0];
  let result;

  let playBtnText = "Play again";

  if (winner === 0) {
    result = "Tie Up";
    playerChoiceEl = choicesEl[playerChoice][1];
    resultMessageSecondaryEl.classList.add("hidden");
    playBtnText = "Replay";
  } else if (winner === 1) {
    result = "You won";
    nextBtn.classList.remove("hidden");
    playerChoiceContainer.classList.add("winner");
    resultMessageSecondaryEl.classList.remove("hidden");
  } else {
    result = "You lost";
    compChoiceContainer.classList.add("winner");
    resultMessageSecondaryEl.classList.remove("hidden");
  }

  playBtns.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  playerChoiceContainer.innerHTML = "";
  compChoiceContainer.innerHTML = "";

  const resultPlayAgainBtn = document.querySelector(".result-play-again-btn");
  resultPlayAgainBtn.textContent = playBtnText;

  playerChoiceContainer.append(playerChoiceEl);
  compChoiceContainer.append(compChoiceEl);
  resultMessagePrimaryEl.textContent = result;
}

function updateScores() {
  localStorage.setItem("player", playerScore);
  localStorage.setItem("comp", compScore);

  playerScoreEl.textContent = playerScore;
  compScoreEl.textContent = compScore;
}

function reset() {
  winner = -1;
  playerChoice = compChoice = null;

  resultContainer.classList.add("hidden");
  winnerEl.classList.add("hidden");
  nextBtn.classList.add("hidden");

  playBtns.classList.remove("hidden");
  header.classList.remove("hidden");

  playerChoiceContainer.classList.remove("winner");
  compChoiceContainer.classList.remove("winner");
}
