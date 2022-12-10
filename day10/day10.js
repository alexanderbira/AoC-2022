import read from "../readFile.js";
const input = await read(import.meta.url);

const instructions = input
  .split("\n")
  .map((i) => [i.split(" ")[0], Number(i.split(" ")[1])]);

let cycle = 0;
let regA = 1; //x-coord of the sprite
let sum = 0;
const screen = [];

const runCycle = () => {
  cycle++;
  if (cycle % 40 === 20) {
    sum += regA * cycle;
  }
  if (Math.abs(regA - ((cycle - 1) % 40)) <= 1) {
    screen.push(true);
  } else {
    screen.push(false);
  }
};

for (let i = 0; i < instructions.length; i++) {
  const [instruction, value] = instructions[i];

  if (instruction === "noop") {
    runCycle();
  } else if (instruction === "addx") {
    runCycle();
    runCycle();

    regA += value;
  }
}

console.log(sum);
console.log(
  screen
    .map((i) => (i ? "#" : "."))
    .join("")
    .replace(/(.{40})/g, "\n$1")
    .slice(1)
);