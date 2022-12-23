import read from "../readFile.js";
const input = await read(23);

const elves = input.split("\n").map((line) => line.split(""));

//find the coords of the elves [x, y, proposedX, proposedY], top left is 0,0
let elfCoords = [];
for (let y = 0; y < elves.length; y++) {
  for (let x = 0; x < elves[y].length; x++) {
    if (elves[y][x] === "#") {
      elfCoords.push([x, y, null, null]);
    }
  }
}

//returns [spreadout:bool, elves:array]
function process(directions, elfCoords) {
  let spreadOut = true;

  for (const elf of elfCoords) {
    //check if there are any other elves around it in the 8 directions
    let touchingElf = false;
    for (const otherElf of elfCoords) {
      if (elf[0] === otherElf[0] && elf[1] === otherElf[1]) continue;
      const xDiff = elf[0] - otherElf[0];
      const yDiff = elf[1] - otherElf[1];
      if (Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) {
        touchingElf = true;
        break;
      }
    }

    if (!touchingElf) {
      //if it's not touching any other elves, it doesn't move
      continue;
    } else {
      spreadOut = false;
    }

    direction: for (const direction of directions) {
      switch (direction) {
        case "N":
          //check if there are any other elves directly N, NE, or NW of it
          for (const otherElf of elfCoords) {
            if (
              otherElf[1] === elf[1] - 1 &&
              Math.abs(otherElf[0] - elf[0]) <= 1
            ) {
              continue direction;
            }
          }
          elf[2] = elf[0];
          elf[3] = elf[1] - 1;
          break direction;

        case "S":
          //check if there are any other elves directly S, SE, or SW of it
          for (const otherElf of elfCoords) {
            if (
              otherElf[1] === elf[1] + 1 &&
              Math.abs(otherElf[0] - elf[0]) <= 1
            ) {
              continue direction;
            }
          }
          elf[2] = elf[0];
          elf[3] = elf[1] + 1;
          break direction;

        case "W":
          //check if there are any other elves directly W, NW, or SW of it
          for (const otherElf of elfCoords) {
            if (
              otherElf[0] === elf[0] - 1 &&
              Math.abs(otherElf[1] - elf[1]) <= 1
            ) {
              continue direction;
            }
          }
          elf[2] = elf[0] - 1;
          elf[3] = elf[1];
          break direction;

        case "E":
          //check if there are any other elves directly E, NE, or SE of it
          for (const otherElf of elfCoords) {
            if (
              otherElf[0] === elf[0] + 1 &&
              Math.abs(otherElf[1] - elf[1]) <= 1
            ) {
              continue direction;
            }
          }
          elf[2] = elf[0] + 1;
          elf[3] = elf[1];
          break direction;
      }
    }
  }

  if (spreadOut) {
    return [true, elfCoords];
  }

  const elvesToMove = JSON.parse(JSON.stringify(elfCoords));
  const stationaryElves = [];

  for (let i = 0; i < elvesToMove.length; i++) {
    let found = false;

    //check if any other elves have the same proposed location. If so, none of them move
    for (let j = i + 1; j < elvesToMove.length; j++) {
      if (
        elvesToMove[i][2] === elvesToMove[j][2] &&
        elvesToMove[i][3] === elvesToMove[j][3]
      ) {
        stationaryElves.push(elvesToMove[j]);
        elvesToMove.splice(j, 1);
        found = true;
        j--;
      }
    }

    if (found) {
      stationaryElves.push(elvesToMove[i]);
      elvesToMove.splice(i, 1);
      i--;
    }
  }

  return [
    false,
    [
      ...elvesToMove.map((elf) => [elf[2], elf[3], null, null]),
      ...stationaryElves.map((elf) => [elf[0], elf[1], null, null]),
    ],
  ];
}

function getGrid(elfCoords) {
  //get the max and min x and y coords (bounding box)
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const elf of elfCoords) {
    if (elf[0] < minX) minX = elf[0];
    if (elf[0] > maxX) maxX = elf[0];
    if (elf[1] < minY) minY = elf[1];
    if (elf[1] > maxY) maxY = elf[1];
  }

  //turn the elves into a printable grid
  let output = "";
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      let found = false;
      for (const elf of elfCoords) {
        if (elf[0] === x && elf[1] === y) {
          output += "#";
          found = true;
          break;
        }
      }
      if (!found) output += ".";
    }
    output += "\n";
  }

  return output;
}

//non-essential drawing function
function drawElves(elfCoords) {
  const grid = getGrid(elfCoords);
  console.log(grid);
}

let directions = ["N", "S", "W", "E"];

for (let i = 0; i < 10; i++) {
  elfCoords = process(directions, elfCoords)[1];
  let firstDir = directions.shift();
  directions.push(firstDir);
}

//count the number of empty spaces
console.log(
  getGrid(elfCoords)
    .split("")
    .reduce((a, i) => (i === "." ? a + 1 : a), 0)
);

console.log(
  "Part 2 might take a minute or two to run (https://media.tenor.com/hF7VpP0MZkIAAAAd/it-is-acceptable-gus-fring-acceptable.gif)"
);

let numIterations = 10; //we already did 10 iterations in part 1!
while (true) {
  //~1000 iterations
  numIterations++;
  const [spreadOut, el] = process(directions, elfCoords);
  elfCoords = el;
  if (spreadOut) break;
  let firstDir = directions.shift();
  directions.push(firstDir);

  // //draw every 100 iterations if you want to see it
  // if (numIterations % 100 === 0) {
  //   drawElves(el);
  // }
}

console.log(numIterations);
