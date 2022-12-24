import read from "../readFile.js";
const input = await read(24);

const area = input.split("\n").map((line) => line.split(""));

//0,0 is top left (inside the walls). i.e. the point under where the player starts

const width = area[0].length - 2;
const height = area.length - 2;

//each blizzard is [startingX,startingY,direction]
const blizzards = [];

for (let y = 1; y < area.length - 1; y++) {
  for (let x = 1; x < area[y].length - 1; x++) {
    if (area[y][x] !== ".") {
      blizzards.push([x - 1, y - 1, area[y][x]]);
    }
  }
}

function modulo(a, b) {
  return ((a % b) + b) % b;
}

function blizzardPosition(blizzard, turn) {
  const [startingX, startingY, direction] = blizzard;
  switch (direction) {
    case "^":
      return [startingX, modulo(startingY - turn, height)];
    case "v":
      return [startingX, modulo(startingY + turn, height)];
    case ">":
      return [modulo(startingX + turn, width), startingY];
    case "<":
      return [modulo(startingX - turn, width), startingY];
  }
}

const blizzardsMemo = {};

function getBlizzardPositions(turn) {
  if (blizzardsMemo[turn] !== undefined) {
    return blizzardsMemo[turn];
  }
  return (blizzardsMemo[turn] = blizzards.map((blizzard) =>
    blizzardPosition(blizzard, turn)
  ));
}

function getShortestTime(startX, startY, goalX, goalY, startTime) {

  //state is [x,y,time]
  const stateQueue = [[startX, startY, startTime]];

  const visited = new Set();

  while (stateQueue.length > 0) {
    const [x, y, time] = stateQueue.shift();

    //check if we've reached the exit
    if (x === goalX && y === goalY) {
      return time;
    }

    //check if we've already visited this state
    if (visited.has(`${x},${y},${time}`)) {
      continue;
    }
    visited.add(`${x},${y},${time}`);


    const blizzardPositions = getBlizzardPositions(time);

    //find every possible move
    const possibleMoves = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
      [x, y],
    ].filter(([x, y]) => {

      //check if it's out of bounds
      if (x < 0 || x >= width || y < 0 || y >= height) {
        if (x === 0 && y === -1) {
          return true;
        } else if (x === width - 1 && y === height) {
          return true;
        }
        return false;
      }

      //check if it's a blizzard
      if (
        blizzardPositions.some(
          ([blizzardX, blizzardY]) => x === blizzardX && y === blizzardY
        )
      ) {
        return false;
      }

      return true;
    });

    possibleMoves.forEach(([x, y]) => {
      stateQueue.push([x, y, time + 1]);
    });
  }
}

console.log("Sorry, this one takes a while to run (3+ mins). I can't be bothered to optimise it.");
const timeThere = getShortestTime(0, 0, width - 1, height - 1, 0);

console.log(timeThere);

const timeBack = getShortestTime(width - 1, height - 1, 0, 0, timeThere+1);

const timeBackThere = getShortestTime(0, 0, width - 1, height - 1, timeBack+1);

console.log(timeBackThere);