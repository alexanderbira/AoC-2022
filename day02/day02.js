import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const input = await readFile(join(__dirname, "input.txt"), "utf8");

const moves = input.split("\n");

const outcomes1 = {
  "A Y": 8,
  "A X": 4,
  "A Z": 3,
  "B Y": 5,
  "B X": 1,
  "B Z": 9,
  "C Y": 2,
  "C X": 7,
  "C Z": 6
}

const outcomes2 = {
  "A Y": 4,
  "A Z": 8,
  "A X": 3,
  "B Y": 5,
  "B Z": 9,
  "B X": 1,
  "C Y": 6,
  "C Z": 7,
  "C X": 2
}

console.log(moves.reduce((a,b)=>a+outcomes1[b], 0));
console.log(moves.reduce((a,b)=>a+outcomes2[b], 0));