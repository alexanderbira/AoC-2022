import read from "../readFile.js";
const input = await read(import.meta.url);

const moves = input
  .split("\n")
  .map((i) => [i.split(" ")[0], Number(i.split(" ")[1])]);

const headPosition = [0, 0];
const allTailPositions = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];
const tailPositions = new Set();
const lastTailPositions = new Set();
tailPositions.add("0,0");
lastTailPositions.add("0,0");

function sign(x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}

for (const [direction, distance] of moves) {
  for (let i = 0; i < distance; i++) {
    switch (direction) {
      case "U":
        headPosition[1]++;
        break;
      case "D":
        headPosition[1]--;
        break;
      case "L":
        headPosition[0]--;
        break;
      case "R":
        headPosition[0]++;
        break;
    }

    for (let knot = 0; knot < allTailPositions.length; knot++) {
      let xDiff, yDiff;
      if (knot === 0) {
        xDiff = headPosition[0] - allTailPositions[knot][0];
        yDiff = headPosition[1] - allTailPositions[knot][1];
      } else {
        xDiff = allTailPositions[knot - 1][0] - allTailPositions[knot][0];
        yDiff = allTailPositions[knot - 1][1] - allTailPositions[knot][1];
      }

      if (Math.abs(xDiff) === 2 && Math.abs(yDiff) === 1) {
        allTailPositions[knot][0] += sign(xDiff);
        allTailPositions[knot][1] += sign(yDiff);
      } else if (Math.abs(xDiff) === 1 && Math.abs(yDiff) === 2) {
        allTailPositions[knot][0] += sign(xDiff);
        allTailPositions[knot][1] += sign(yDiff);
      } else if (Math.abs(xDiff) === 2 && Math.abs(yDiff) === 2) {
        allTailPositions[knot][0] += sign(xDiff);
        allTailPositions[knot][1] += sign(yDiff);
      } else if (Math.abs(xDiff) === 2) {
        allTailPositions[knot][0] += sign(xDiff);
      } else if (Math.abs(yDiff) === 2) {
        allTailPositions[knot][1] += sign(yDiff);
      }
    }
    tailPositions.add(allTailPositions[0].join(","));
    lastTailPositions.add(allTailPositions[8].join(","));
  }
}

console.log(tailPositions.size);
console.log(lastTailPositions.size);