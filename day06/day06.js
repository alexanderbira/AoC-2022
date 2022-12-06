import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const input = await readFile(join(__dirname, "input.txt"), "utf8");

const lastFour = [input[0], input[1], input[2], input[3]];
let start = 4;
for (let letter of input.slice(4)) {
  if (new Set(lastFour).size === lastFour.length) {
    break;
  }
  lastFour.shift();
  lastFour.push(letter);
  start++;
}
console.log(start);

const lastFourteen = [
  input[0],
  input[1],
  input[2],
  input[3],
  input[4],
  input[5],
  input[6],
  input[7],
  input[8],
  input[9],
  input[10],
  input[11],
  input[12],
  input[13],
];
start = 14;
for (let letter of input.slice(14)) {
  if (new Set(lastFourteen).size === lastFourteen.length) {
    break;
  }
  lastFourteen.shift();
  lastFourteen.push(letter);
  start++;
}
console.log(start);
