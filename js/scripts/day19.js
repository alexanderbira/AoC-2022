import read from "../readFile.js";
const input = await read(19);

// Maybe having a formatter isn't so good after all
// Challenge: count the number of ",\n" in this script

const blueprints = input.split("\n").map((line) => {
  const [
    _i,
    oreRobotOreCost,
    clayRobotOreCost,
    obsidianRobotOreCost,
    obsidianRobotClayCost,
    geodeRobotOreCost,
    geodeRobotObsidianCost,
  ] = [...Array.from(line.matchAll(/\d+/g)).map((match) => parseInt(match[0]))];
  return {
    oreRobotOreCost,
    clayRobotOreCost,
    obsidianRobotOreCost,
    obsidianRobotClayCost,
    geodeRobotOreCost,
    geodeRobotObsidianCost,
  };
});

function maxGeodes(
  ore,
  clay,
  obsidian,
  geodes,
  oreRobots,
  clayRobots,
  obsidianRobots,
  geodeRobots,
  timeElapsed,
  totalTime,
  blueprint,

  //Only build at most the number of robots needed to ensure they're not a bottleneck for building other robots (i.e. if the robot that costs the most ore costs 10 ore, we can only build at most 10 ore robots) because we can only build one robot at a time anyway
  maxOreRobots,
  maxClayRobots,
  maxObsidianRobots
) {
  //If we only build at most one robot of each type in each loop, we can still have all combinations of robots being built at different times, but with far fewer recursive calls
  //This could be done with memoization instead (maxGeodes is a pure function), but I tried it and it's slow
  let builtOre = false;
  let builtClay = false;
  let builtObsidian = false;
  let builtGeode = false;

  let max = geodes;

  for (let time = timeElapsed; time < totalTime; time++) {
    //have to check if we could have built the robots before we produce resources
    const canBuildOreRobot = blueprint.oreRobotOreCost <= ore;
    const canBuildClayRobot = blueprint.clayRobotOreCost <= ore;
    const canBuildObsidianRobot =
      blueprint.obsidianRobotOreCost <= ore &&
      blueprint.obsidianRobotClayCost <= clay;
    const canBuildGeodeRobot =
      blueprint.geodeRobotOreCost <= ore &&
      blueprint.geodeRobotObsidianCost <= obsidian;

    //Produce resources
    ore += oreRobots;
    clay += clayRobots;
    obsidian += obsidianRobots;
    geodes += geodeRobots;

    //Building each robots as soon as possible is the optimal strategy so we don't waste time

    //See what would happen if we built the ore robot now
    if (canBuildOreRobot && !builtOre && oreRobots < maxOreRobots) {
      max = Math.max(
        max,
        maxGeodes(
          ore - blueprint.oreRobotOreCost,
          clay,
          obsidian,
          geodes,
          oreRobots + 1,
          clayRobots,
          obsidianRobots,
          geodeRobots,
          time + 1,
          totalTime,
          blueprint,
          maxOreRobots,
          maxClayRobots,
          maxObsidianRobots
        )
      );
      builtOre = true;
    }

    //See what would happen if we built the clay robot now
    if (canBuildClayRobot && !builtClay && clayRobots < maxClayRobots) {
      max = Math.max(
        max,
        maxGeodes(
          ore - blueprint.clayRobotOreCost,
          clay,
          obsidian,
          geodes,
          oreRobots,
          clayRobots + 1,
          obsidianRobots,
          geodeRobots,
          time + 1,
          totalTime,
          blueprint,
          maxOreRobots,
          maxClayRobots,
          maxObsidianRobots
        )
      );
      builtClay = true;
    }

    //See what would happen if we built the obsidian robot now
    if (
      canBuildObsidianRobot &&
      !builtObsidian &&
      obsidianRobots < maxObsidianRobots
    ) {
      max = Math.max(
        max,
        maxGeodes(
          ore - blueprint.obsidianRobotOreCost,
          clay - blueprint.obsidianRobotClayCost,
          obsidian,
          geodes,
          oreRobots,
          clayRobots,
          obsidianRobots + 1,
          geodeRobots,
          time + 1,
          totalTime,
          blueprint,
          maxOreRobots,
          maxClayRobots,
          maxObsidianRobots
        )
      );
      builtObsidian = true;
    }

    //See what would happen if we built the geode robot now
    if (canBuildGeodeRobot && !builtGeode) {
      max = Math.max(
        max,
        maxGeodes(
          ore - blueprint.geodeRobotOreCost,
          clay,
          obsidian - blueprint.geodeRobotObsidianCost,
          geodes,
          oreRobots,
          clayRobots,
          obsidianRobots,
          geodeRobots + 1,
          time + 1,
          totalTime,
          blueprint,
          maxOreRobots,
          maxClayRobots,
          maxObsidianRobots
        )
      );
      builtGeode = true;
    }

    //See what would happen if we built no robots
    max = Math.max(max, geodes);
  }

  return max;
}

console.log(
  blueprints
    .map(
      (bp, i) =>
        (i + 1) *
        maxGeodes(
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          24,
          bp,
          Math.max(
            bp.oreRobotOreCost,
            bp.clayRobotOreCost,
            bp.obsidianRobotOreCost,
            bp.geodeRobotOreCost
          ),
          bp.obsidianRobotClayCost,
          bp.geodeRobotObsidianCost
        )
    )
    .reduce((a, b) => a + b, 0)
);

console.log(
  blueprints
    .slice(0, 3)
    .map((bp) =>
      maxGeodes(
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        32,
        bp,
        Math.max(
          bp.oreRobotOreCost,
          bp.clayRobotOreCost,
          bp.obsidianRobotOreCost,
          bp.geodeRobotOreCost
        ),
        bp.obsidianRobotClayCost,
        bp.geodeRobotObsidianCost
      )
    )
    .reduce((a, b) => a * b, 1)
);
