import read from "../readFile.js";
const input = await read(20);

let numbers = input.split("\n").map((line) => ({ item: parseInt(line) }));

function mix(times) {
  const result = [...numbers];

  for (let i = 0; i < times; i++) {
    for (let j = 0; j < numbers.length; j++) {
      const n = numbers[j];
      const offset = n.item;

      if (offset === 0) {
        continue;
      }

      const pos = result.indexOf(n);
      const posNew = (pos + offset) % (result.length - 1);

      result.splice(pos, 1);
      result.splice(posNew, 0, n);
    }
  }

  return result;
}

function answer(numbers) {
  const result = numbers.map((n) => n.item);
  let total = 0;

  for (let pos of [1000, 2000, 3000]) {
    const index = (result.indexOf(0) + pos) % result.length;
    total += result[index];
  }

  return total;
}

console.log(answer(mix(1)));
numbers = numbers.map((n) => ({ item: n.item * 811589153 }));
console.log(answer(mix(10)));
