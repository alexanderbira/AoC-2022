import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const input = await readFile(join(__dirname, "input.txt"), "utf8");

const sums = input.split("\n\n").map((nums) =>
  nums
    .split("\n")
    .map((i) => parseInt(i))
    .reduce((a, b) => a + b, 0)
);

const greatest3 = sums.reduce(
  (prev, curr) => {
    if (curr > prev[1]) {
      if (curr > prev[0]) {
        return [curr, prev[0], prev[1]];
      } else {
        return [prev[0], curr, prev[1]];
      }
    } else if (curr > prev[2]) {
      return [prev[0], prev[1], curr];
    } else {
      return prev;
    }
  },
  [0, 0, 0]
);

console.log(greatest3[0]);
console.log(greatest3[0] + greatest3[1] + greatest3[2]);
