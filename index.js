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
  let count = 0;
  while (path != null) {
    rev.push(path.value);
    count++;
    path = path.prev;
  }
  // log count and moves
  console.log(`You made it in ${count - 1} moves! Here's your path:`);
  for (const move of rev.reverse()) {
    console.log(move);
  }
}

// test program
knightMoves([0, 0], [7, 7]);
