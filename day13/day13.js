import read from "../readFile.js";
const input = await read(import.meta.url);

const pairs = input.split("\n\n").map((i) => i.split("\n").map((i) => eval(i)));

const checkOrdered = (a, b) => {
  if (typeof a === "number") {
    if (typeof b === "number") {
      return a === b ? null : a < b;
    } else {
      return checkOrdered([a], b);
    }
  } else {
    if (typeof b === "number") {
      return checkOrdered(a, [b]);
    } else {
      for (let i = 0; i < Math.max(b.length, a.length); i++) {
        if (a[i] === undefined) return true;
        if (b[i] === undefined) return false;

        const ordered = checkOrdered(a[i], b[i]);
        if (ordered !== null) return ordered;
      }
      return null;
    }
  }
};

console.log(
  pairs.reduce(
    (prev, [a, b], i) => (checkOrdered(a, b) ? prev + i + 1 : prev),
    0
  )
);

console.log(
  [[[2]], [[6]], ...pairs.flat(1)]
    .sort((a, b) => (checkOrdered(a, b) ? -1 : 1))
    .reduce(
      (prev, curr, i) =>
        ["[[2]]", "[[6]]"].includes(JSON.stringify(curr))
          ? prev * (i + 1)
          : prev,
      1
    )
);
