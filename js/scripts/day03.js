import read from "../readFile.js";
const input = await read(3);

const priorityOrder =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const compartments = input
  .split("\n")
  .map((rucksack) => [
    rucksack.slice(0, rucksack.length / 2),
    rucksack.slice(rucksack.length / 2, rucksack.length),
  ]);
const commonItems = compartments.map((compartment) => {
  for (let i = 0; i < compartment[0].length; i++) {
    if (compartment[1].includes(compartment[0][i])) {
      return compartment[0][i];
    }
  }
});
const itemValues = commonItems.map((item) => priorityOrder.indexOf(item) + 1);
console.log(itemValues.reduce((a, b) => a + b));

const rucksacks = input.split("\n");
const groups = [];
for (let i = 0; i < rucksacks.length; i += 3) {
  groups.push([rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]]);
}
const groupBadges = groups.map((group) => {
  for (let i = 0; i < group[0].length; i++) {
    if (group[1].includes(group[0][i]) && group[2].includes(group[0][i])) {
      return group[0][i];
    }
  }
});
const badgeValues = groupBadges.map(
  (badge) => priorityOrder.indexOf(badge) + 1
);
console.log(badgeValues.reduce((a, b) => a + b));
