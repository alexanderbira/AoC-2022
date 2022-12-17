import read from "../readFile.js";
const input = await read(17);

const jets = input.split("").map((i) => (i === ">" ? 1 : -1));

const getJet = (i) => jets[i % jets.length];

//[x,y]

const newRock = (i) =>
  [
    [
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ],
    [
      [3, 0],
      [2, 1],
      [3, 1],
      [4, 1],
      [3, 2],
    ],
    [
      [2, 0],
      [3, 0],
      [4, 0],
      [4, 1],
      [4, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
    ],
    [
      [2, 0],
      [3, 0],
      [2, 1],
      [3, 1],
    ],
  ][i % 5];

const checkOverlap = (rock, cave) => {
  for (let i of rock) {
    if (cave.some((j) => i[0] === j[0] && i[1] === j[1])) {
      return true;
    }
  }
  return false;
};

const moveRock = (rock, direction, cave) => {
  let newRock = rock.map((i) => [i[0] + direction, i[1]]);
  //check if newRock overlaps with any other rock, has gone off the edge (x>6 or x<0)
  if (
    checkOverlap(newRock, cave) ||
    newRock.some((i) => i[0] > 6 || i[0] < 0)
  ) {
    return rock;
  }
  return newRock;
};

const moveRocks = (iterations) => {
  let cave = [];
  let maxY = -1;
  let jet = 0;
  for (let i = 0; i < iterations; i++) {
    //generate new rock
    let newR = newRock(i).map((i) => [i[0], i[1] + maxY + 4]);
    while (true) {
      newR = moveRock(newR, getJet(jet), cave);
      jet++;

      //move the new rock down one and check if it overlaps with any other rock or goes below the bottom of the cave
      let newR2 = newR.map((i) => [i[0], i[1] - 1]);
      if (checkOverlap(newR2, cave) || newR2.some((i) => i[1] < 0)) {
        //if it does, add it to the cave
        cave.push(...newR);
        maxY = Math.max(maxY, ...newR.map((i) => i[1]));
        break;
      } else {
        //if it doesn't, move it down one
        newR = newR2;
      }
    }
  }
  //return the max y value of the cave
  return maxY + 1;
};

console.log(moveRocks(2022)); //3068
