import knightMoves from './data';

// cache DOM
const text = document.querySelector('#path-text');

// create chessboard
const gameboardDisplay = () => {
  const outerDiv = document.createElement('div');
  for (let i = 0; i < 8; i += 1) {
    const row = document.createElement('div');
    row.setAttribute('id', `Row-${i}`);
    for (let j = 0; j < 8; j += 1) {
      const column = document.createElement('div');
      column.classList.add(`Column-${j}`);
      column.style.backgroundColor = 'white';
      row.appendChild(column);
      outerDiv.appendChild(row);
    }
  }
  outerDiv.setAttribute('id', 'outer-div');
  return outerDiv;
};

// color chessboard
const gameboardColor = () => {
  const square = document.querySelectorAll('#outer-div div div');
  for (let i = 0; i < square.length; i += 1) {
    const x = Number(square[i].parentNode.id.slice(-1));
    const y = Number(square[i].classList.value.slice(-1));
    square[i].style.backgroundColor = 'white';
    if (y % 2 === 0 && x % 2 !== 0) {
      square[i].style.backgroundColor = 'black';
    }
    if (x % 2 === 0 && y % 2 !== 0) {
      square[i].style.backgroundColor = 'black';
    }
  }
};

// highlight square of chessboard
const highlightSquare = (arr, index, square) => {
  const curSquare = square[index];
  if (arr.length === 0) {
    curSquare.style.backgroundColor = '#a5e0a5';
  } else if (arr.length === 1) {
    curSquare.style.backgroundColor = '#f09a9a';
  }
};

// display moves between start & end points
const displayMoves = (move) => {
  const knightCount = document.querySelectorAll('.img');
  const number = knightCount.length;
  const rowName = `#Row-${move[0].toString()}`;
  const row = document.querySelector(`${rowName}`);
  const columnName = `.Column-${move[1].toString()}`;
  const column = row.querySelectorAll(`${columnName}`);
  const img = document.createElement('img');
  img.src = 'src/images/chess-knight.svg';
  img.classList.add('img');
  const count = document.createElement('p');
  count.textContent = number;
  column[0].appendChild(img);
  column[0].appendChild(count);
};

// detect click and return coordinates
const detectClick = (i) => {
  const square = document.querySelectorAll('#outer-div div div');
  const coordinates = [];
  const x = Number(square[i].parentNode.id.slice(-1));
  const y = Number(square[i].classList.value.slice(-1));
  coordinates.push(x);
  coordinates.push(y);
  return coordinates;
};

// display text stating the number of moves
const pathText = (count) => {
  text.textContent = `You made it in ${count - 1} moves!`;
};

// call knightMoves, pathText, & displayMoves functions on second square click
const callKnightMoves = (arr, index) => {
  const startPoint = detectClick(index);
  arr.push(startPoint);
  if (arr.length === 2) {
    const moves = knightMoves(arr[0], arr[1]);
    pathText(moves.length);
    for (let i = 0; i < moves.length; i += 1) {
      displayMoves(moves[i]);
    }
  }
};

export { gameboardDisplay, highlightSquare, gameboardColor, callKnightMoves };
