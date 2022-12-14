import read from "../readFile.js";
const input = await read(9);

const moves = input
  .split("\n")
  .map((i) => [i.split(" ")[0], Number(i.split(" ")[1])]);

const positions = Array.from({ length: 10 }, () => [0, 0]);
const firstTailPositions = new Set(["0,0"]);
const lastTailPositions = new Set(["0,0"]);

for (const [direction, distance] of moves) {
  for (let i = 0; i < distance; i++) {
    switch (direction) {
      case "U":
        positions[0][1]++;
        break;
      case "D":
        positions[0][1]--;
        break;
      case "L":
        positions[0][0]--;
        break;
      case "R":
        positions[0][0]++;
        break;
    }

    for (let knot = 1; knot < positions.length; knot++) {
      let xDiff = positions[knot - 1][0] - positions[knot][0];
      let yDiff = positions[knot - 1][1] - positions[knot][1];

      if (Math.abs(xDiff) === 2) {
        positions[knot][0] += Math.sign(xDiff);
        if (Math.abs(yDiff) > 0) {
          positions[knot][1] += Math.sign(yDiff);
        }
      } else if (Math.abs(yDiff) === 2) {
        positions[knot][1] += Math.sign(yDiff);
        if (Math.abs(xDiff) === 1) {
          positions[knot][0] += Math.sign(xDiff);
        }
      }
    }
    firstTailPositions.add(positions[1].join(","));
    lastTailPositions.add(positions[9].join(","));
  }
}

console.log(firstTailPositions.size);
console.log(lastTailPositions.size);
