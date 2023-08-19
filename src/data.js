// node class
class Node {
  constructor(value) {
    this.value = value;
    this.edgesList = [];
    this.prev = null;
  }
}

// create gameboard of nodes
const gameboard = () => {
  const gameboardArr = [];
  for (let i = 0; i < 8; i += 1) {
    gameboardArr[i] = [];
    for (let j = 0; j < 8; j += 1) {
      const node = new Node([i, j]);
      gameboardArr[i][j] = node;
    }
  }
  return gameboardArr;
};

// create gameboard
const graph = gameboard();

// establish possible moves on gameboard from a given point
const getMoves = (arr) => {
  const moves = [
    [arr[0] + 1, arr[1] + 2],
    [arr[0] + 2, arr[1] + 1],
    [arr[0] + 1, arr[1] - 2],
    [arr[0] + 2, arr[1] - 1],
    [arr[0] - 1, arr[1] + 2],
    [arr[0] - 2, arr[1] + 1],
    [arr[0] - 1, arr[1] - 2],
    [arr[0] - 2, arr[1] - 1],
  ];
  const legalMoves = [];
  //
  for (const move of moves) {
    if (move[0] >= 0 && move[1] >= 0 && move[0] <= 7 && move[1] <= 7) {
      legalMoves.push(move);
    }
  }
  const gameboardMoves = [];
  for (const legalMove of legalMoves) {
    gameboardMoves.push(graph[legalMove[0]][legalMove[1]]);
  }
  return gameboardMoves;
};

// declare queue and visited arrays
const queue = [];
const visited = [];

// breadth first seach function
const search = (start, end) => {
  // remove first item in queue and add to visited
  visited.push(queue.shift());
  // iterate through edgelists
  for (const adjacency of start.edgesList) {
    // if not visited yet
    if (!visited.includes(adjacency)) {
      // link them to previous move
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
  }
  // otherwise, call the function again with next up element in the queue
  return search(queue[0], end);
};

const knightMoves = (start, end) => {
  // map beginning and end values to graph and respective nodes
  const beginning = graph[start[0]][start[1]];
  const finish = graph[end[0]][end[1]];
  // get possible moves from starting position, set them to the beginning node, and push the node to the queue
  const moves = getMoves(start);
  beginning.edgesList = moves;
  queue.push(beginning);
  // get the matching node when found
  let path = search(beginning, finish);
  // follow the prev property until null (aka start point), push the values to new array, and count the moves
  const rev = [];
  while (path != null) {
    rev.push(path.value);
    path = path.prev;
  }
  // return array of moves
  const movesArr = [];
  for (const move of rev.reverse()) {
    movesArr.push(move);
  }
  return movesArr;
};

export default knightMoves;
