import read from "../readFile.js";
const input = await read(16);

//read input
const valves = Object.fromEntries(
  input.split("\n").map((line) => {
    let valve = line.slice(6, 8);
    let flowRate = Number(line.match(/\d+/g)[0]);
    let connections = line.split("; ")[1].slice(22).trim().split(", ");

    return [valve, { valve, flowRate, connections, openable: flowRate > 0 }];
  })
);

const openableValves = Object.values(valves).filter((valve) => valve.openable);

//shortest distances between each valve and every other valve
let distances = {};
for (let valve of Object.values(valves)) {
  distances[valve.valve] = {};
  for (let otherValve of Object.values(valves)) {
    distances[valve.valve][otherValve.valve] = 0;
  }

  let visited = new Set();
  let queue = [valve];

  while (queue.length > 0) {
    let currentValve = queue.shift();
    visited.add(currentValve.valve);

    for (let connection of currentValve.connections) {
      if (!visited.has(connection)) {
        distances[valve.valve][connection] =
          distances[valve.valve][currentValve.valve] + 1;
        queue.push(valves[connection]);
      }
    }
  }
}

function greatestVolume(valve, visited, volume, time) {
  let volumes = [volume];
  for (let nextValve of openableValves) {
    //if the valve hasn't been visited and there is enough time to get there and open it
    if (
      !visited.has(nextValve.valve) &&
      time - 1 - distances[valve.valve][nextValve.valve] > 0
    ) {
      visited.add(nextValve.valve);
      volumes.push(
        greatestVolume(
          nextValve,
          visited,
          volume +
            nextValve.flowRate *
              (time - 1 - distances[valve.valve][nextValve.valve]),
          time - 1 - distances[valve.valve][nextValve.valve]
        )
      );
      visited.delete(nextValve.valve);
    }
  }

  return Math.max(...volumes);
}

console.log(greatestVolume(valves["AA"], new Set(["AA"]), 0, 30));
console.log("Doing part 2 now. It may take up to a minute to run.");

//find all the possible combinations of splitting the valves between me and the elephant
const split = Math.floor(openableValves.length / 2);

let combinations = [];

function findCombinations(me, elephant, remaining) {
  if (remaining.length === 0) {
    combinations.push([me, elephant]);
  } else {
    findCombinations(me.concat(remaining[0]), elephant, remaining.slice(1));
    findCombinations(me, elephant.concat(remaining[0]), remaining.slice(1));
  }
}

findCombinations([], [], openableValves);

//only keep the combinations where the number of valves I have is at most 1 more than the number of valves the elephant has
//this is probably correct in most cases, but change the === to a <= if it doesn't work (will take longer to run)
combinations = combinations.filter((arr) => arr[0].length === split);

let biggest = 0;

for (let combination of combinations) {
  let me = combination[0];
  let elephant = combination[1];

  let meVolume = greatestVolume(
    valves["AA"],
    new Set(["AA", ...elephant.map((i) => i.valve)]),
    0,
    26
  );
  let elephantVolume = greatestVolume(
    valves["AA"],
    new Set(["AA", ...me.map((i) => i.valve)]),
    0,
    26
  );

  biggest = Math.max(biggest, meVolume + elephantVolume);
}

console.log(biggest);
