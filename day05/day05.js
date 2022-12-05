import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const input = await readFile(join(__dirname, "input.txt"), "utf8");

const parts = input.split("\n\n");

const startingStuff = parts[0].split("\n");
const stack = {};
let numStacks = 0
for (let i of startingStuff[startingStuff.length-1].trim().split("   ")) {
  numStacks ++;
  stack[i] = [];
}
startingStuff.pop();
for (let row of startingStuff) {
  for (let i = 0; i < numStacks; i ++) {
    if (row[(i*4)+1] !== " ") {
      stack[i+1].unshift( row[(i*4)+1] );
    }
  }
}

const stack2 = JSON.parse(JSON.stringify(stack));

for (let instruction of parts[1].split("\n")) {
  const numbers = instruction.slice(5).split(" from ");
  const twoNums = numbers[1].split(" to ");
  numbers[1] = twoNums[0];
  numbers[2] = twoNums[1];

  for (let i = 0; i < parseInt(numbers[0]); i ++) {
    stack[numbers[2]].push(stack[numbers[1]].pop());
  }

  const slice = stack2[numbers[1]].splice(stack2[numbers[1]].length-numbers[0], numbers[0])
  stack2[numbers[2]] = [...stack2[numbers[2]], ...slice];
}

console.log(Object.keys(stack).map(i => stack[i][stack[i].length-1]).reduce((a, b)=>a+b,""))
console.log(Object.keys(stack2).map(i => stack2[i][stack2[i].length-1]).reduce((a, b)=>a+b,""))