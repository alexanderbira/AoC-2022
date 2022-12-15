import read from "../readFile.js";
const input = await read(15);

function dist(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

const distances = input.split("\n").map((line) => {
  const [sensorX, sensorY, beaconX, beaconY] = [
    ...Array.from(line.matchAll(/-?\d+/g)).map((match) => parseInt(match[0])),
  ];
  return [sensorX, sensorY, dist(sensorX, sensorY, beaconX, beaconY)];
});

function getXRanges(y) {
  let intervals = [];
  for (let [sensorX, sensorY, dist] of distances) {
    const halfWidth = dist - Math.abs(sensorY - y);
    if (halfWidth >= 0)
      intervals.push([sensorX - halfWidth, sensorX + halfWidth]);
  }
  return intervals.sort((a, b) => a[0] - b[0]);
}

//find all ranges of x-values covered by the sensors
const ranges = getXRanges(2000000);

//merge any overlaps
for (let i = 1; i < ranges.length; i++) {
  if (ranges[i][0] <= ranges[i - 1][1]) {
    ranges[i][0] = ranges[i - 1][0];
    ranges[i][1] = Math.max(ranges[i][1], ranges[i - 1][1]);
    ranges.splice(i - 1, 1);
    i--;
  }
}

//sum up the remaining ranges
console.log(ranges.reduce((acc, [left, right]) => acc + right - left, 0));

outer: for (let y = 0; y <= 4000000; y++) {
  //find all ranges of x-values covered by the sensors
  const ranges = getXRanges(y);

  //check for any gaps in the ranges
  let current = -1;
  for (const [left, right] of ranges) {
    if (left > current + 1) {
      console.log(4000000 * (current + 1) + y);
      break outer;
    }
    current = Math.max(current, right);
  }

  //check for any gaps at the end
  if (current < 4000000) {
    console.log(4000000 * (current + 1) + y);
    break;
  }
}
