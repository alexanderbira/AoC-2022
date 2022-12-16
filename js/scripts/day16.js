import read from "../readFile.js";
const input = await read(16);

//read input
let valves = Object.fromEntries(
  input.split("\n").map((line) => {
    let valve = line.slice(6, 8);
    let flowRate = Number(line.match(/\d+/g)[0]);
    let connections = line.split("; ")[1].slice(22).trim().split(", ");

    return [valve, { valve, flowRate, connections, openable: flowRate > 0 }];
  })
);

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
  for (let nextValve of Object.values(valves)) {
    //if the valve hasn't been visited, is openable, and there is enough time to get there and open it
    if (
      !visited.has(nextValve.valve) &&
      nextValve.openable &&
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
