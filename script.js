'use strict';
let diceRoll = document.querySelector('.btn--roll');
let hold = document.querySelector('.btn--hold');
let imgAttribute = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const newGame = document.querySelector('.btn--new');

let playing;
let currentScore;
let activePlayer;
let scores;

function start() {
  score0El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score1El.textContent = 0;
  imgAttribute.classList.add('hidden');

  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  player1.classList.remove('player--active');
  player0.classList.add('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
}
start();
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

diceRoll.addEventListener('click', function () {
  if (playing) {
    imgAttribute.classList.remove('hidden');
    let diceNumber = Math.floor(Math.random() * 6) + 1;
    imgAttribute.setAttribute('src', `dice-${diceNumber}.png`);

    if (diceNumber > 1) {
      currentScore = currentScore + diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (diceNumber === 1) {
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      imgAttribute.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else switchPlayer();
  }
});
newGame.addEventListener('click', start);
