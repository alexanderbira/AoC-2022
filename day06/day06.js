import read from "../readFile.js";
const input = await read(import.meta.url);

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
