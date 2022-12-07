import read from "../readFile.js";
const input = await read(import.meta.url);

const tree = {};
const stack = []; // holds directories history (linked objects)
let currDir = tree; // current directory

for (const line of input.split("\n")) {
  let parts = line.split(" ");

  if (parts[0] === "$") {
    if (parts[1] === "ls") continue;

    if (parts[1] === "cd") {
      if (parts[2] === "..") {
        currDir = stack.pop();
      } else {
        const dirName = parts[2];
        stack.push(currDir);
        currDir[dirName] = {};
        currDir = currDir[dirName];
      }
    }
  } else {
    if (parts[0] === "dir") {
      currDir[parts[1]] = {};
    } else {
      currDir[parts[1]] = parseInt(parts[0]);
    }
  }
}

let directories = [];

function getSizes(curr) {
  if (typeof curr === "number") return curr;

  let size = 0;
  for (let key in curr) {
    size += getSizes(curr[key]);
  }
  directories.push(size);
  return size;
}

getSizes(tree);

console.log(directories.filter((x) => x <= 100000).reduce((a, b) => a + b, 0));

const freeSpace = 70000000 - Math.max(...directories);
const spaceNeeded = 30000000 - freeSpace;
console.log(Math.min(...directories.filter((x) => x >= spaceNeeded)));