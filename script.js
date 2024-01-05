"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnRestart = document.querySelector(".btn--restart");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const btnNew = document.querySelector(".btn--new");
const btnCloseModal = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

// console.log(current0El);
let scores, currentScore, activePlayer, playing;
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

const closeModal = function () {
  modal.classList.add("hidden");
  //   modal.classList.add("fade-in");
  //   overlay.classList.add("fade-in");
  overlay.classList.add("hidden");
};
const showModal = function () {
  console.log(activePlayer);

  overlay.classList.remove("hidden");
  overlay.classList.add("fade-in");
  modal.classList.remove("hidden");
  modal.classList.add("fade-in");

  document.querySelector(".winner").textContent = `Player ${
    activePlayer + 1
  } Wins! 🎉`;
};

//Starting conditions
const startNew = function () {
  closeModal();
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0; // not necessary
  current1El.textContent = 0; // not necessary

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
};
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add("hidden");

startNew(); // Start Initial Game

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generating Random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice value to the current score.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current Score to active player's score
    scores[activePlayer] += currentScore;
    // 2. display score of the active player
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //   console.log(scores);

    // 3. Check if the player's score is >=100
    if (scores[activePlayer] >= 50) {
      // Finish playing
      playing = false;
      diceEl.classList.add("hidden");
      showModal();
      // Adding winner class and removing active class.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      //   console.log(`Player ${activePlayer + 1} wins.`);
    } else {
      // 4. switch to next player
      switchPlayer();
    }
  }
});

btnRestart.addEventListener("click", startNew);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
btnNew.addEventListener("click", startNew);
