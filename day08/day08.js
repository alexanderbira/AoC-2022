import read from "../readFile.js";
const input = await read(import.meta.url);

const lines = input.split("\n").map((line) => line.split("").map(Number));

function checkVisible(row, col) {
  const val = lines[row][col];

  // check if all values above are smaller
  let above = true;
  for (let i = row - 1; i >= 0; i--) {
    if (lines[i][col] >= val) {
      above = false;
      break;
    }
  }
  if (above) return true;

  // check if all values below are smaller
  let below = true;
  for (let i = row + 1; i < lines.length; i++) {
    if (lines[i][col] >= val) {
      below = false;
      break;
    }
  }
  if (below) return true;

  // check if all values left are smaller
  let left = true;
  for (let i = col - 1; i >= 0; i--) {
    if (lines[row][i] >= val) {
      left = false;
      break;
    }
  }
  if (left) return true;

  // check if all values right are smaller
  let right = true;
  for (let i = col + 1; i < lines[row].length; i++) {
    if (lines[row][i] >= val) {
      right = false;
      break;
    }
  }
  if (right) return true;

  return false;
}

function checkScenic(row, col) {
  const val = lines[row][col];

  //check how many items are above until we find a bigger one
  let above = 0;
  for (let i = row - 1; i >= 0; i--) {
    if (lines[i][col] < val) {
      above++;
    } else {
      above++;
      break;
    }
  }

  //check how many items are below until we find a bigger one
  let below = 0;
  for (let i = row + 1; i < lines.length; i++) {
    if (lines[i][col] < val) {
      below++;
    } else {
      below++;
      break;
    }
  }

  //check how many items are left until we find a bigger one
  let left = 0;
  for (let i = col - 1; i >= 0; i--) {
    if (lines[row][i] < val) {
      left++;
    } else {
      left++;
      break;
    }
  }

  //check how many items are right until we find a bigger one
  let right = 0;
  for (let i = col + 1; i < lines[row].length; i++) {
    if (lines[row][i] < val) {
      right++;
    } else {
      right++;
      break;
    }
  }

  return above * below * left * right;
  
}

let count = 0;
let maxScenic = 0;
for (let row = 0; row < lines.length; row++) {
  for (let col = 0; col < lines[row].length; col++) {
    if (checkVisible(row, col)) count++;
    const scenic = checkScenic(row, col);
    if (scenic > maxScenic) maxScenic = scenic;
  }
}

console.log(count);
console.log(maxScenic);