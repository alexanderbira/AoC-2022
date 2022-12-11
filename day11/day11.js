import read from "../readFile.js";
const input = await read(import.meta.url);

const monkeys = input.split("\n\n").map((monkey) => {
  const lines = monkey.split("\n");
  return {
    items: lines[1].split(":")[1].trim().split(", "),
    operation: lines[2].split("= ")[1].split(" "),
    test: Number(lines[3].slice(21)),
    throwTo: [Number(lines[4].slice(29)), Number(lines[5].slice(30))],
    inspections: [0, 0],
  };
});
const modulo = monkeys.reduce((acc, monkey) => acc * monkey.test, 1);
const initialItems = monkeys.map((monkey) => [...monkey.items]);

function conductMonkeyBusiness(problem) {
  const rounds = problem === 0 ? 20 : 10000;
  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkeys) {
      for (const item of monkey.items) {
        let result = eval(
          `${monkey.operation[0] === "old" ? item : monkey.operation[0]} ${
            monkey.operation[1]
          } ${monkey.operation[2] === "old" ? item : monkey.operation[2]}`
        );

        if (problem === 0) result = Math.floor(result / 3);
        result %= modulo;
        monkey.inspections[problem]++;

        monkeys[
          result % monkey.test === 0 ? monkey.throwTo[0] : monkey.throwTo[1]
        ].items.push(result);
      }
      monkey.items = [];
    }
  }
}

conductMonkeyBusiness(0);
const monkeyBusinesses0 = monkeys
  .map((monkey) => monkey.inspections[0])
  .sort((a, b) => a - b)
  .reverse();
console.log(monkeyBusinesses0[0] * monkeyBusinesses0[1]);

monkeys.forEach((monkey, i) => (monkey.items = initialItems[i]));

conductMonkeyBusiness(1);
const monkeyBusinesses1 = monkeys
  .map((monkey) => monkey.inspections[1])
  .sort((a, b) => a - b)
  .reverse();
console.log(monkeyBusinesses1[0] * monkeyBusinesses1[1]);
