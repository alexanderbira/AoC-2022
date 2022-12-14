import read from "../readFile.js";
const input = await read(14);

const paths = input
  .split("\n")
  .map((path) => path.split(" -> ").map((node) => node.split(",").map(Number)));
const height =
  Math.max(...paths.map((nodes) => nodes.map((node) => node[1])).flat(3)) + 1;
const width =
  Math.max(...paths.map((nodes) => nodes.map((node) => node[0])).flat(3)) + 1;
const grid = Array.from(Array(height), () =>
  Array.from(new Array(width + height), () => 0)
);

for (const path of paths) {
  for (let i = 0; i < path.length - 1; i++) {
    const [x, y] = path[i];
    const [nextX, nextY] = path[i + 1];
    const [dx, dy] = [nextX - x, nextY - y];
    if (dx === 0) {
      for (let j = 0; j <= Math.abs(dy); j++) {
        grid[y + j * Math.sign(dy)][x] = 1;
      }
    } else {
      for (let j = 0; j <= Math.abs(dx); j++) {
        grid[y][x + j * Math.sign(dx)] = 1;
      }
    }
  }
}

function getSands() {
  let grid_ = JSON.parse(JSON.stringify(grid));
  let sands = 0;

  for (
    let sand = [0, 500];
    !(grid_[sand[0] + 1] === undefined || grid_[0][500] === 2);
    sands++
  ) {
    sand = [0, 500];

    while (true) {
      if (grid_[sand[0] + 1] === undefined) {
        break;
      } else if (grid_[sand[0] + 1][sand[1]] === 0) {
        sand[0]++;
      } else if (grid_[sand[0] + 1][sand[1] - 1] === 0) {
        sand[0]++;
        sand[1]--;
      } else if (grid_[sand[0] + 1][sand[1] + 1] === 0) {
        sand[0]++;
        sand[1]++;
      } else {
        break;
      }
    }
    grid_[sand[0]][sand[1]] = 2;
  }

  return sands;
}

console.log(getSands() - 1);

grid.push(Array.from(new Array(width + height), () => 0));
grid.push(Array.from(new Array(width + height), () => 1));

console.log(getSands());
