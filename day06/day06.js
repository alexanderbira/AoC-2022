import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const input = await readFile(join(__dirname, "input.txt"), "utf8");

let start = 4;
for (
  let slice = input.slice(start - 4, start);
  start < input.length && !(new Set(slice).size === slice.length);
  start++, slice = input.slice(start - 4, start)
);
console.log(start);

start = 14;
for (
  let slice = input.slice(start - 14, start);
  start < input.length && !(new Set(slice).size === slice.length);
  start++, slice = input.slice(start - 14, start)
);
console.log(start);
