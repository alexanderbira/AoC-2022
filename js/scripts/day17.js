import read from "../readFile.js";
const input = await read(17);

const jets = input.split("").map((i) => (i === ">" ? 1 : -1));

const getJet = (i) => jets[i % jets.length];

//[x,y]

const newRock = (i) =>
  [
    [
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ],
    [
      [3, 0],
      [2, 1],
      [3, 1],
      [4, 1],
      [3, 2],
    ],
    [
      [2, 0],
      [3, 0],
      [4, 0],
      [4, 1],
      [4, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
    ],
    [
      [2, 0],
      [3, 0],
      [2, 1],
      [3, 1],
    ],
  ][i % 5];

const checkOverlap = (rock, cave) => {
  for (let i of rock) {
    if (cave.some((j) => i[0] === j[0] && i[1] === j[1])) {
      return true;
    }
  }
  return false;
};

const moveRock = (rock, direction, cave) => {
  let newRock = rock.map((i) => [i[0] + direction, i[1]]);
  //check if newRock overlaps with any other rock, has gone off the edge (x>6 or x<0)
  if (
    checkOverlap(newRock, cave) ||
    newRock.some((i) => i[0] > 6 || i[0] < 0)
  ) {
    return rock;
  }
  return newRock;
};

let topOfCaves = new Set();
let memo = {};

const moveRocks = (iterations) => {
  let cave = [];
  let maxY = -1;
  let jet = 0;
  for (let i = 0; i < iterations; i++) {
    //generate new rock
    let newR = newRock(i).map((i) => [i[0], i[1] + maxY + 4]);
    while (true) {
      newR = moveRock(newR, getJet(jet), cave);
      jet++;

      //move the new rock down one and check if it overlaps with any other rock or goes below the bottom of the cave
      let newR2 = newR.map((i) => [i[0], i[1] - 1]);
      if (checkOverlap(newR2, cave) || newR2.some((i) => i[1] < 0)) {
        //if it does, add it to the cave
        cave.push(...newR);
        maxY = Math.max(maxY, ...newR.map((i) => i[1]));

        //get the y values of the inserted rock (unique)
        let yVals = [...new Set(newR.map((i) => i[1]))];
        //for each y value, check if there are 7 rocks in that row
        for (let y of yVals) {
          if (cave.filter((i) => i[1] === y).length === 7) {
            //if there are, remove all the rocks below it as no rocks can fall to them
            cave = cave.filter((i) => i[1] >= y);
          }
        }

        //find the smallest y value of the cave
        let minY = Math.min(...cave.map((i) => i[1]));
        let caveMoved = cave.map((i) => [i[0], i[1] - minY]);

        //check if the cave is the same as any previous cave (same top rocks in the same positions with the same jet and rock pattern)
        if (
          topOfCaves.has([...caveMoved, jet % jets.length, i % 5].join(","))
        ) {
          //if it is, find how many rocks had to fall to get how much of an increase in y
          let i1 = memo[[...caveMoved, jet % jets.length, i % 5].join(",")][0];
          let y1 = memo[[...caveMoved, jet % jets.length, i % 5].join(",")][1];
          let y2 = maxY;
          let yIncrease = y2 - y1;
          let iIncrease = i - i1;

          //we need to just keep adding as many yIncrease to maxY and iIncrease to i until i is just smaller than the number of desired iterations
          //we can do this in logaritmic time by adding doubles of the increases instead of just adding 1 increase at a time (which would take forever)
          let iIncreases = [iIncrease];
          let yIncreases = [yIncrease];
          while (iIncrease < iterations - i) {
            iIncrease *= 2;
            yIncrease *= 2;
            iIncreases.push(iIncrease);
            yIncreases.push(yIncrease);
          }
          iIncreases.pop();
          yIncreases.pop();
          iIncreases = iIncreases.reverse();
          yIncreases = yIncreases.reverse();

          //keep adding the last iIncrease and yIncrease to i and y until i is just smaller than the number of iterations left
          for (
            let increaseNum = 0;
            increaseNum < iIncreases.length;
            increaseNum++
          ) {
            while (i + iIncreases[increaseNum] < iterations) {
              i += iIncreases[increaseNum];
              y2 += yIncreases[increaseNum];
            }
            i -= iIncreases[increaseNum];
            y2 -= yIncreases[increaseNum];
          }

          //find the difference between maxY and the highest y value of the cave and move all the rocks up by that amount
          let yDiff = y2 - maxY;
          cave = cave.map((i) => [i[0], i[1] + yDiff]);

          maxY = y2;
        } else {
          topOfCaves.add([...caveMoved, jet % jets.length, i % 5].join(","));
          //how many rocks had to fall before this one. when this repeats, we know the pattern cycles every i1-i2 rocks
          memo[[...caveMoved, jet % jets.length, i % 5].join(",")] = [i, maxY];
        }

        break;
      } else {
        //if it doesn't, move it down one
        newR = newR2;
      }
    }
  }
  //return the max y value of the cave
  return maxY + 1;
};

//the example case is mean because it always leaves a gap on the right side so it never has full rows
//so just don't use it
console.log(moveRocks(2022));

topOfCaves = new Set();
memo = {};
console.log(moveRocks(1000000000000));
