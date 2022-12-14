import read from "../readFile.js";
const input = await read(6);

const slice = (window) => {
  let start = window;
  for (
    let slice = input.slice(start - window, start);
    start < input.length && !(new Set(slice).size === slice.length);
    start++, slice = input.slice(start - window, start)
  );
  console.log(start);
};

slice(4);
slice(14);
