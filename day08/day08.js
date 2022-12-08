import read from "../readFile.js";
const input = await read(import.meta.url);

const lines = input.split("\n").map((line) => line.split("").map(Number));

function getInfo(row, col) {
  const val = lines[row][col];

  // check if all values above are smaller
  let above = true;
  let numAbove = 0;
  for (let i = row - 1; i >= 0; i--) {
    numAbove++;
    if (lines[i][col] >= val) {
      above = false;
      break;
    }
  }

  // check if all values below are smaller
  let below = true;
  let numBelow = 0;
  for (let i = row + 1; i < lines.length; i++) {
    numBelow++;
    if (lines[i][col] >= val) {
      below = false;
      break;
    }
  }

  // check if all values left are smaller
  let left = true;
  let numLeft = 0;
  for (let i = col - 1; i >= 0; i--) {
    numLeft++;
    if (lines[row][i] >= val) {
      left = false;
      break;
    }
  }

  // check if all values right are smaller
  let right = true;
  let numRight = 0;
  for (let i = col + 1; i < lines[row].length; i++) {
    numRight++;
    if (lines[row][i] >= val) {
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

for (let row = 0; row < lines.length; row++) {
  for (let col = 0; col < lines[row].length; col++) {
    const [visibe, scenic] = getInfo(row, col);
    if (visibe) {
      count++;
    }
    if (scenic > maxScenic) {
      maxScenic = scenic;
    }
  }
}

console.log(count);
console.log(maxScenic);