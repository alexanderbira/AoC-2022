import read from "../readFile.js";
const input = await read(import.meta.url);

const instructions = input
  .split("\n")
  .map((i) => [i.split(" ")[0], Number(i.split(" ")[1])]);

let cycle = 0;
let regA = 1; //x-coord of the sprite
let sum = 0;
let screen = "";

const runCycle = () => {
  screen += Math.abs(regA - (cycle % 40)) <= 1 ? "██" : "░░"; //double width for better readability
  cycle++;
  if (cycle % 40 === 20) {
    sum += regA * cycle;
  }
};

for (const [instruction, value] of instructions) {
  runCycle();
  if (instruction === "addx") {
    runCycle();
    regA += value;
  }
}

console.log(sum);
console.log(screen.replace(/(.{80})/g, "$1\n"));
