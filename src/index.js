import {
  gameboardDisplay,
  highlightSquare,
  gameboardColor,
  callKnightMoves,
} from './dom';

// render & color gameboard
const gameboard = gameboardDisplay();
document.body.appendChild(gameboard);
gameboardColor();

// declare arr to keep track of start & end points
const arr = [];

// cache DOM
const square = document.querySelectorAll('#outer-div div div');
const reset = document.querySelector('#clear');

// bind events
for (let i = 0; i < square.length; i += 1) {
  square[i].addEventListener('mouseover', () => {
    highlightSquare(arr, i, square);
    square[i].addEventListener('mouseout', () => {
      gameboardColor();
    });
  });
  square[i].addEventListener('click', () => {
    callKnightMoves(arr, i);
  });
}

reset.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.reload();
});
