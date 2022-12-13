import read from "../readFile.js";
const input = await read(import.meta.url);

const pairs = input.split("\n\n").map((i) => i.split("\n").map((i) => eval(i)));

function checkOrdered(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    if (a === b) {
      return null;
    }
    return a < b;
  }

  if (typeof a === "object" && typeof b === "object") {
    for (let i = 0; i < Math.max(b.length, a.length); i++) {
      if (a[i] === undefined) {
        return true;
      }
      if (b[i] === undefined) {
        return false;
      }
      let ordered = checkOrdered(a[i], b[i]);
      if (ordered !== null) {
        return ordered;
      }
    }
    return null;
  }

  if (typeof a === "object" && typeof b === "number") {
    return checkOrdered(a, [b]);
  }

  if (typeof a === "number" && typeof b === "object") {
    return checkOrdered([a], b);
  }
}

console.log(
  pairs.reduce((prev, [a, b], i) => {
    if (checkOrdered(a, b)) {
      return prev + i + 1;
    }
    return prev;
  }, 0)
);

const ordered = [[[2]], [[6]], ...pairs.flat(1)].sort((a,b)=>checkOrdered(a,b)?-1:1);
console.log([ordered.findIndex((i) => {
  if (i.length === 1) {
    if (i[0].length === 1) {
      return i[0][0] === 2;
    }
    return false;
  }
  return false;
})+1,
ordered.findIndex((i) => {
  if (i.length === 1) {
    if (i[0].length === 1) {
      return i[0][0] === 6;
    }
    return false;
  }
  return false;
})+1].reduce((prev, i) => prev * i, 1));
