import read from "../readFile.js";
const input = await read(4);

const pairs = input
  .split("\n")
  .map((x) => x.split(",").map((y) => y.split("-").map((n) => parseInt(n))));

const contained = pairs.reduce(
  (num, pair) =>
    (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) ||
    (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1])
      ? num + 1
      : num,
  0
);
console.log(contained);

const overlap = pairs.reduce(
  (num, pair) =>
    (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][0]) ||
    (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][0])
      ? num + 1
      : num,
  0
);
console.log(overlap);
