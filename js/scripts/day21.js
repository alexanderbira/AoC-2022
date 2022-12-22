import read from "../readFile.js";
const input = await read(21);

const monkeyValues = input.split("\n").map((line) => {
  const name = line.slice(0, 4);
  //find the number in the line if any
  const value = line.match(/\d+/g);
  return { name, value: value ? parseInt(value[0]) : line.split(": ")[1] };
});

let monkeys = {};

const monkeysToBeCalculated = [];

for (let monkey of monkeyValues) {
  monkeys[monkey.name] = monkey.value;
  if (typeof monkey.value === "string") {
    monkeysToBeCalculated.push(monkey.name);
  }
}

while (typeof monkeys.root !== "number") {
  for (let monkey of monkeysToBeCalculated) {
    let [first, operator, second] = monkeys[monkey].split(" ");
    if (
      typeof monkeys[first] === "number" &&
      typeof monkeys[second] === "number"
    ) {
      monkeys[monkey] = eval(monkeys[first] + operator + monkeys[second]);
      monkeysToBeCalculated.splice(monkeysToBeCalculated.indexOf(monkey), 1);
    }
  }
}

console.log(monkeys.root);


monkeys = {};

for (let monkey of monkeyValues) {
  monkeys[monkey.name] = monkey.value;
}

monkeys.humn = "x";

let [left, _, right] = monkeys.root.split(" ");

while (true) {
  let anyGroups = false;

  //find all groups of 4 letters in the left side
  let groups = left.match(/[a-z]{4}/g);

  if (groups) {
    anyGroups = true;
    for (let group of groups) {
      //replace the group with the value of the monkey
      if (typeof monkeys[group] === "number") {
        left = left.replace(group, monkeys[group]);
      } else {
        left = left.replace(group, `(${monkeys[group]})`);
      }
    }
  }

  //find all groups of 4 letters in the right side
  groups = right.match(/[a-z]{4}/g);

  if (groups) {
    anyGroups = true;
    for (let group of groups) {
      //replace the group with the value of the monkey
      if (typeof monkeys[group] === "number") {
        right = right.replace(group, monkeys[group]);
      } else {
        right = right.replace(group, `(${monkeys[group]})`);
      }
    }
  }

  if (!anyGroups) {
    break;
  }
}

right = eval(right);

//I could find x by reversing the order of the operations, but I'm lazy and I'll just use iteration instead
//See: https://en.wikipedia.org/wiki/Root-finding_algorithms#Bisection_method

const expression = `${left} - ${right}`;
function evaluate(value) {
  return eval(expression.replace(/x/g, value));
}

//find if the function is increasing or decreasing
const increasing = evaluate(1) < evaluate(2);

//want to find where the expression is 0
if (!increasing) {
  let lower, upper;

  //find some reasonable range where the expression is 0
  if (evaluate(0) > 0) {
    lower = 0;
    upper = 1;
    while (evaluate(upper) > 0) {
      upper *= 2;
    }
  } else {
    upper = 0;
    lower = 1;
    while (evaluate(lower) < 0) {
      lower *= 2;
    }
  }

  //now we have a range where the expression is 0
  //let's find it with binary search
  while (upper - lower > 1) {
    const middle = Math.floor((upper + lower) / 2);
    if (evaluate(middle) > 0) {
      lower = middle;
    } else {
      upper = middle;
    }
  }

  if (evaluate(lower) !== 0) {
    lower++;
  }

  console.log(lower);
} else {
  //I just copy pasted the code above and changed the signs, I didn't test it
  let lower, upper;

  //find some reasonable range where the expression is 0
  if (evaluate(0) < 0) {
    lower = 0;
    upper = 1;
    while (evaluate(upper) < 0) {
      upper *= 2;
    }
  } else {
    upper = 0;
    lower = 1;
    while (evaluate(lower) > 0) {
      lower *= 2;
    }
  }

  //now we have a range where the expression is 0
  //let's find it with binary search
  while (upper - lower > 1) {
    const middle = Math.floor((upper + lower) / 2);
    if (evaluate(middle) < 0) {
      lower = middle;
    } else {
      upper = middle;
    }
  }

  if (evaluate(lower) !== 0) {
    lower++;
  }

  console.log(lower);
}
