import read from "../readFile.js";
const input = await read(import.meta.url);

const heightMap = input.split("\n").map((line) => line.split(""));

const start = heightMap
  .flatMap((row, y) => row.map((cell, x) => [cell, x, y]))
  .find(([cell]) => cell === "S")
  .slice(1);
const end = heightMap
  .flatMap((row, y) => row.map((cell, x) => [cell, x, y]))
  .find(([cell]) => cell === "E")
  .slice(1);

const heights = "SabcdefghijklmnopqrstuvwxyzE".split("");

const getShortestPath = (start, end, direction) => {
  const visited = new Set();
  const queue = [[start, 0]];

  while (queue.length) {
    const [current, distance] = queue.shift();

    if (visited.has(current.join(","))) continue;
    visited.add(current.join(","));

    const [x, y] = current;
    if (heightMap[y][x] === end) return distance;

    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ].filter(([xn, yn]) => {
      if (heightMap[yn] === undefined || heightMap[yn][xn] === undefined) return false;
      if (direction === "up") {
        return heights.indexOf(heightMap[yn][xn]) <= heights.indexOf(heightMap[y][x])+1;
      } else {
        return heights.indexOf(heightMap[y][x]) <= heights.indexOf(heightMap[yn][xn])+1;
      }

    });
    queue.push(...neighbors.map((neighbor) => [neighbor, distance + 1]));
  }
}

console.log(getShortestPath(start, "E", "up"));
console.log(getShortestPath(end, "a", "down"));