import read from "../readFile.js";
const input = await read(18);

const coords = input.split("\n").map((i) => i.split(",").map(Number));

let surfaceArea = 6 * coords.length;

for (let [x, y, z] of coords) {
  coords.forEach(([x2, y2, z2]) => {
    if (x === x2 && y === y2 && z === z2) return;
    if (x === x2 && y === y2 && (z === z2 + 1 || z === z2 - 1)) surfaceArea--;
    if (x === x2 && z === z2 && (y === y2 + 1 || y === y2 - 1)) surfaceArea--;
    if (y === y2 && z === z2 && (x === x2 + 1 || x === x2 - 1)) surfaceArea--;
  });
}

console.log(surfaceArea);

const x = coords.map((i) => i[0]);
const y = coords.map((i) => i[1]);
const z = coords.map((i) => i[2]);

const xMin = Math.min(...x) - 1;
const xMax = Math.max(...x) + 1;
const yMin = Math.min(...y) - 1;
const yMax = Math.max(...y) + 1;
const zMin = Math.min(...z) - 1;
const zMax = Math.max(...z) + 1;

const visited = new Set();

//returns the number of faces which block the flood fill
function getBlockingFaces(x, y, z) {
  //if the coordinates are outside the cube, return 0
  if (x < xMin || x > xMax || y < yMin || y > yMax || z < zMin || z > zMax)
    return 0;

  //if the coordinates are already visited, return 0
  if (visited.has(`${x},${y},${z}`)) return 0;

  //add the coordinates to the visited set
  visited.add(`${x},${y},${z}`);

  let numFaces = 0;

  //if the coordinates are in coords, add 1 to the number of faces
  //otherwise, call the function again with the new coordinates
  if (coords.some((i) => i[0] === x + 1 && i[1] === y && i[2] === z))
    numFaces++;
  else numFaces += getBlockingFaces(x + 1, y, z, visited);
  if (coords.some((i) => i[0] === x - 1 && i[1] === y && i[2] === z))
    numFaces++;
  else numFaces += getBlockingFaces(x - 1, y, z, visited);
  if (coords.some((i) => i[0] === x && i[1] === y + 1 && i[2] === z))
    numFaces++;
  else numFaces += getBlockingFaces(x, y + 1, z, visited);
  if (coords.some((i) => i[0] === x && i[1] === y - 1 && i[2] === z))
    numFaces++;
  else numFaces += getBlockingFaces(x, y - 1, z, visited);
  if (coords.some((i) => i[0] === x && i[1] === y && i[2] === z + 1))
    numFaces++;
  else numFaces += getBlockingFaces(x, y, z + 1, visited);
  if (coords.some((i) => i[0] === x && i[1] === y && i[2] === z - 1))
    numFaces++;
  else numFaces += getBlockingFaces(x, y, z - 1, visited);

  return numFaces;
}

console.log(getBlockingFaces(xMin, yMin, zMin));
