// create gameboard of nodes
function gameboard() {
  let gameboardArr = [];
  for (let i = 0; i < 8; i++) {
    gameboardArr[i] = [];
    for (let j = 0; j < 8; j++) {
      let node = new Node([i, j]);
      gameboardArr[i][j] = node;
    }
  }
  return gameboardArr;
}

// establish possible moves on gameboard from a given point
function getMoves(arr) {
  let moves = [
    [arr[0] + 1, arr[1] + 2],
    [arr[0] + 2, arr[1] + 1],
    [arr[0] + 1, arr[1] - 2],
    [arr[0] + 2, arr[1] - 1],
    [arr[0] - 1, arr[1] + 2],
    [arr[0] - 2, arr[1] + 1],
    [arr[0] - 1, arr[1] - 2],
    [arr[0] - 2, arr[1] - 1],
  ];
  let legalMoves = [];
  //
  for (let move of moves) {
    if (move[0] >= 0 && move[1] >= 0 && move[0] <= 7 && move[1] <= 7) {
      legalMoves.push(move);
    }
  }
  let gameboardMoves = [];
  for (let legalMove of legalMoves) {
    gameboardMoves.push(graph[legalMove[0]][legalMove[1]]);
  }
  return gameboardMoves;
}

// node class
class Node {
  constructor(value) {
    this.value = value;
    this.edgesList = [];
    this.prev = null;
  }
}

// create gameboard
let graph = gameboard();

// declare queue and visited arrays
const queue = [];
const visited = [];

// breadth first seach function
function search(start, end) {
  // remove first item in queue and add to visited
  visited.push(queue.shift());
  // iterate through edgelists
  for (const adjacency of start.edgesList) {
    // if not visited yet
    if (!visited.includes(adjacency)) {
      //link them to previous move
      adjacency.prev = start;
      // create edgelists for these new positions
      adjacency.edgesList = getMoves(adjacency.value);
      // push them to queue
      queue.push(adjacency);
    }
  }
  // if there's a match, return that node
  if (start.value.toString() === end.value.toString()) {
    return start;
  } else {
    // otherwise, call the function again with next up element in the queue
    return search(queue[0], end);
  }
}

function knightMoves(start, end) {
  // map beginning and end values to graph and respective nodes
  let beginning = graph[start[0]][start[1]];
  let finish = graph[end[0]][end[1]];
  // get possible moves from starting position, set them to the beginning node, and push the node to the queue
  let moves = getMoves(start);
  beginning.edgesList = moves;
  queue.push(beginning);
  // get the matching node when found
  let path = search(beginning, finish);
  // follow the prev property until null (aka start point), push the values to new array, and count the moves
  let rev = [];
  while (path != null) {
    rev.push(path.value);
    path = path.prev;
  }
  // return array of moves
  let movesArr = [];
  for (const move of rev.reverse()) {
    movesArr.push(move);
  }
  return movesArr;
}

function refreshPage() {
  window.location.reload();
}

function gameboardDisplay() {
  const outerDiv = document.getElementById("outer-div");
  for (let i = 0; i < 8; i++) {
    const row = document.createElement("div");
    row.setAttribute("id", `Row-${i}`);
    for (let j = 0; j < 8; j++) {
      const column = document.createElement("div");
      column.classList.add(`Column-${j}`);
      column.style.backgroundColor = "white";
      row.appendChild(column);
      outerDiv.appendChild(row);
    }
  }
  gameboardColor();
}

function gameboardColor() {
  const square = document.querySelectorAll("#outer-div div div");
  for (let i = 0; i < square.length; i++) {
    const x = parseInt(square[i].parentNode.id.slice(-1));
    const y = parseInt(square[i].classList.value.slice(-1));
    square[i].style.backgroundColor = "white";
    if (y % 2 === 0 && x % 2 !== 0) {
      square[i].style.backgroundColor = "black";
    }
    if (x % 2 === 0 && y % 2 !== 0) {
      square[i].style.backgroundColor = "black";
    }
  }
}

function highlightSquare(arr, index, square) {
  if (arr.length === 0) {
    square[index].style.backgroundColor = "#a5e0a5";
  } else if (arr.length === 1) {
    square[index].style.backgroundColor = "#f09a9a";
  }
}

function displayMoves(move) {
  const knightCount = document.querySelectorAll(".img");
  const number = knightCount.length;
  const rowName = `#Row-${move[0].toString()}`;
  const row = document.querySelector(`${rowName}`);
  const columnName = `.Column-${move[1].toString()}`;
  const column = row.querySelectorAll(`${columnName}`);
  const img = document.createElement("img");
  img.src = "chess-knight.svg";
  img.classList.add("img");
  const count = document.createElement("p");
  count.textContent = number;
  column[0].appendChild(img);
  column[0].appendChild(count);
}

function detectClick(i) {
  const square = document.querySelectorAll("#outer-div div div");
  const coordinates = [];
  const x = parseInt(square[i].parentNode.id.slice(-1));
  const y = parseInt(square[i].classList.value.slice(-1));
  coordinates.push(x);
  coordinates.push(y);
  return coordinates;
}

function callKnightMoves(arr, index) {
  const startPoint = detectClick(index);
  arr.push(startPoint);
  if (arr.length === 2) {
    let moves = knightMoves(arr[0], arr[1]);
    pathText(moves.length);
    for (let i = 0; i < moves.length; i++) {
      displayMoves(moves[i]);
    }
  }
}

function pathText(count) {
  const pathText = document.querySelector("#path-text");
  pathText.textContent = `You made it in ${count - 1} moves!`;
}

// test program
window.onload = function () {
  gameboardDisplay();
  let arr = [];

  const square = document.querySelectorAll("#outer-div div div");
  for (let i = 0; i < square.length; i++) {
    square[i].addEventListener("mouseover", () => {
      highlightSquare(arr, i, square);
      square[i].addEventListener("mouseout", () => {
        gameboardColor();
      });
    });
    square[i].addEventListener("click", () => {
      callKnightMoves(arr, i);
    });
  }
};
