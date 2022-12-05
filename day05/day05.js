import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const input = await readFile(join(__dirname, "input.txt"), "utf8");

const parts = input.split("\n\n");

const startingStuff = parts[0].split("\n");
const stacks = {};
let numStacks = 0;
for (let i of startingStuff[startingStuff.length - 1].trim().split("   ")) {
  numStacks++;
  stacks[i] = [];
}
startingStuff.pop();
for (let row of startingStuff) {
  for (let i = 0; i < numStacks; i++) {
    if (row[i * 4 + 1] !== " ") {
      stacks[i + 1].unshift(row[i * 4 + 1]);
    }
  }
}

const stack2 = JSON.parse(JSON.stringify(stacks));

for (let instruction of parts[1].split("\n")) {
  const numbers = instruction.match(/\d+/g);

  for (let i = 0; i < parseInt(numbers[0]); i++) {
    stacks[numbers[2]].push(stacks[numbers[1]].pop());
  }

  stack2[numbers[2]] = [
    ...stack2[numbers[2]],
    ...stack2[numbers[1]].splice(
      stack2[numbers[1]].length - numbers[0],
      numbers[0]
    ),
  ];
}

console.log(
  Object.keys(stacks)
    .map((i) => stacks[i][stacks[i].length - 1])
    .reduce((a, b) => a + b, "")
);
console.log(
  Object.keys(stack2)
    .map((i) => stack2[i][stack2[i].length - 1])
    .reduce((a, b) => a + b, "")
);
