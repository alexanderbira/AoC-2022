import read from "../readFile.js";
const input = await read(8);

const heights = input.split("\n").map((line) => line.split("").map(Number));

function getInfo(row, col) {
  const height = heights[row][col];

  // check if all trees above are smaller
  let above = true;
  let numAbove = 0;
  for (let i = row - 1; i >= 0; i--) {
    numAbove++;
    if (heights[i][col] >= height) {
      above = false;
      break;
    }
  }

  // check if all trees below are smaller
  let below = true;
  let numBelow = 0;
  for (let i = row + 1; i < heights.length; i++) {
    numBelow++;
    if (heights[i][col] >= height) {
      below = false;
      break;
    }
  }

  // check if all trees left are smaller
  let left = true;
  let numLeft = 0;
  for (let i = col - 1; i >= 0; i--) {
    numLeft++;
    if (heights[row][i] >= height) {
      left = false;
      break;
    }
  }

  // check if all trees right are smaller
  let right = true;
  let numRight = 0;
  for (let i = col + 1; i < heights[row].length; i++) {
    numRight++;
    if (heights[row][i] >= height) {
      right = false;
      break;
    }
  }

  return [
    above || below || left || right,
    numAbove * numBelow * numLeft * numRight,
  ];
}

let count = 0;
let maxScenic = 0;

for (let row = 0; row < heights.length; row++) {
  for (let col = 0; col < heights[row].length; col++) {
    const [visibe, scenic] = getInfo(row, col);
    if (visibe) count++;
    if (scenic > maxScenic) maxScenic = scenic;
  }
}

console.log(count);
console.log(maxScenic);
