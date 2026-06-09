// Constants
const FLASH_KEYFRAMES = [
  { filter: "brightness(70%)", scale: 1 },
  { filter: "brightness(100%)", scale: 1.025 },
];

const FLASH_DURATION = 400;
const FLASH_DELAY = 1000;

// HTML Elements
const redButton = document.getElementById("red");
const blueButton = document.getElementById("blue");
const yellowButton = document.getElementById("yellow");
const greenButton = document.getElementById("green");
const buttons = [redButton, blueButton, yellowButton, greenButton];

const statusEl = document.getElementById("status");
const roundNum = document.getElementById("roundNum");

// Game state
let round = 0;
let usersTurn = false;

let currentSequence = [];
let inputSequence = [];

// Sets the initial state, adds event listeners and starts the first round
function init() {
  currentSequence = Array(3)
    .fill()
    .map((_) => Math.floor(Math.random() * 4));
  buttons.forEach((b) => {
    b.addEventListener("click", buttonClick);
    b.disabled = true;
  });

  flashSequence();
}

// Flashes the current sequence, then starts the user's turn
function flashSequence() {
  usersTurn = false;
  statusEl.innerText = "";

  for (let index = 0; index < currentSequence.length; index++) {
    buttons[currentSequence[index]].animate(FLASH_KEYFRAMES, {
      duration: FLASH_DURATION,
      iterations: 2,
      direction: "alternate",
      delay: index * FLASH_DELAY,
    });
  }

  setTimeout(() => {
    startUsersTurn();
  }, currentSequence.length * FLASH_DELAY);
}

// Enables the buttons and resets the user's input sequence
function startUsersTurn() {
  usersTurn = true;
  inputSequence = [];
  buttons.forEach((b) => (b.disabled = false));
}

// Handles button clicks, and checks if the user's input sequence is correct once they've entered enough inputs
function buttonClick(e) {
  if (!usersTurn) return;

  statusEl.innerText = "";

  e.target.animate(FLASH_KEYFRAMES, {
    duration: FLASH_DURATION,
    iterations: 2,
    direction: "alternate",
  });

  const idx = Number(e.target.dataset.idx);
  inputSequence.push(idx);

  if (inputSequence.length == currentSequence.length) {
    usersTurn = false;
    buttons.forEach((b) => (b.disabled = true));

    if (inputSequence.join() == currentSequence.join()) {
      statusEl.innerText = "Correct!";
      statusEl.style.color = "green";

      setTimeout(() => {
        round++;
        currentSequence.push(Math.floor(Math.random() * 4));
        roundNum.innerText = round + 1;

        flashSequence();
      }, 3000);
    } else {
      statusEl.innerText = "Incorrect!";
      statusEl.style.color = "crimson";

      setTimeout(() => {
        flashSequence();
      }, 1500);
    }
  }
}

init();
