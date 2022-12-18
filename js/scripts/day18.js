import read from "../readFile.js";
const input = await read(18);

const coords = input.split("\n").map((i) => i.split(",").map(Number));

let surfaceArea = 6 * coords.length;

//for each block subtract the number of faces which are touching another block
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

//returns the number of faces which block the flood fill of the outer surface
function getBlockingFaces(x, y, z, offSurfaceMoves) {

  //if the coordinates are outside the cube containing the surface or have already been visited, return 0
  if (x < xMin || x > xMax || y < yMin || y > yMax || z < zMin || z > zMax || visited.has(`${x},${y},${z}`)) return 0;

  let numFaces = 0;
  let faces = 0b000000;

  //check if there is a block in any of the 6 directions and set the corresponding bit in faces
  coords.forEach(([x2, y2, z2]) => {
    if (x === x2 && y === y2 && z === z2 + 1) {
      faces |= 0b000001;
      numFaces++;
      return;
    }
    if (x === x2 && y === y2 && z === z2 - 1) {
      faces |= 0b000010;
      numFaces++;
      return;
    }
    if (x === x2 && z === z2 && y === y2 + 1) {
      faces |= 0b000100;
      numFaces++;
      return;
    }
    if (x === x2 && z === z2 && y === y2 - 1) {
      faces |= 0b001000;
      numFaces++;
      return;
    }
    if (y === y2 && z === z2 && x === x2 + 1) {
      faces |= 0b010000;
      numFaces++;
      return;
    }
    if (y === y2 && z === z2 && x === x2 - 1) {
      faces |= 0b100000;
      numFaces++;
      return;
    }
  });

  //if is touching the surface
  if (faces !== 0) {
    offSurfaceMoves = 0;
  } else {
    offSurfaceMoves++;
    if (offSurfaceMoves > 1) return 0; //if it's more than 1 block away from the surface, ignore any subsequent blocks
  }

  //add the coordinates to the visited set
  visited.add(`${x},${y},${z}`);

  for (let i = 0; i < 6; i++) {
    if ((0b100000>>i & faces)!==0) continue; //there was a block in that direction
    
    //if there isn't a block in that direction, move in that direction and check again
    switch (i) {
      case 5:
        numFaces += getBlockingFaces(x, y, z - 1, offSurfaceMoves);
        break;
      case 4:
        numFaces += getBlockingFaces(x, y, z + 1, offSurfaceMoves);
        break;
      case 3:
        numFaces += getBlockingFaces(x, y - 1, z, offSurfaceMoves);
        break;
      case 2:
        numFaces += getBlockingFaces(x, y + 1, z, offSurfaceMoves);
        break;
      case 1:
        numFaces += getBlockingFaces(x - 1, y, z, offSurfaceMoves);
        break;
      case 0:
        numFaces += getBlockingFaces(x + 1, y, z, offSurfaceMoves);
        break;
    }
  }

  return numFaces;
}

const start = [...coords.find((i) => i[0] === xMin+1)]; //start at some point just above the surface

console.log(getBlockingFaces(xMin, start[1], start[2], 0));
