import read from "../readFile.js";
const input = await read(22);

let [board, instructions] = input.split("\n\n");

board = board.split("\n").map((line) => line.split(""));

instructions = instructions.split(/(\d+)/g);
instructions.pop();
instructions.shift();
instructions = instructions.map((possibleNumber) => {
  if (possibleNumber.match(/\d+/g)) {
    return parseInt(possibleNumber);
  } else {
    return possibleNumber;
  }
});

//find the leftmost open tile of the top row of tiles
let x = 0;
let y = 0;
for (let i = 0; i < board[0].length; i++) {
  if (board[0][i] === ".") {
    x = i;
    break;
  }
}

const initialPosition = {
  y,
  x,
  direction: "right",
};

let position = { ...initialPosition };

//I am aware that this could be much simpler, but I don't care
instruction: for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i];
  if (typeof instruction === "number") {
    step: for (let j = 0; j < instruction; j++) {
      switch (position.direction) {
        case "right":
          //if the tile I'm moving to is #, the instruction is complete
          if (board[position.y][position.x + 1] === "#") {
            continue instruction;
          }
          //if the tile I'm moving to is " " or is off the board, I'm actually wrapping around to the first "." or "#" of the row
          if (
            board[position.y][position.x + 1] === " " ||
            board[position.y][position.x + 1] === undefined
          ) {
            for (let k = 0; k < board[position.y].length; k++) {
              if (board[position.y][k] === "#") {
                //if the tile I'm moving to is "#", the instruction is complete
                continue instruction;
              } else if (board[position.y][k] === ".") {
                //if the tile I'm moving to is ".", move to it
                position.x = k;
                continue step;
              }
            }
          }
          position.x++;
          break;
        case "left":
          //if the tile I'm moving to is #, the instruction is complete
          if (board[position.y][position.x - 1] === "#") {
            continue instruction;
          }
          //if the tile I'm moving to is " ", I'm actually wrapping around to the last "." or "#" of the row
          if (
            board[position.y][position.x - 1] === " " ||
            board[position.y][position.x - 1] === undefined
          ) {
            for (let k = board[position.y].length - 1; k >= 0; k--) {
              if (board[position.y][k] === "#") {
                //if the tile I'm moving to is "#", the instruction is complete
                continue instruction;
              } else if (board[position.y][k] === ".") {
                //if the tile I'm moving to is ".", move to it
                position.x = k;
                continue step;
              }
            }
          }
          position.x--;
          break;
        case "up":
          //if the tile I'm moving to is " ", I'm actually wrapping around to the last "." or "#" of the column
          if (
            board[position.y - 1] === undefined ||
            board[position.y - 1][position.x] === " " ||
            board[position.y - 1][position.x] === undefined
          ) {
            for (let k = board.length - 1; k >= 0; k--) {
              if (board[k][position.x] === "#") {
                //if the tile I'm moving to is "#", the instruction is complete
                continue instruction;
              } else if (board[k][position.x] === ".") {
                //if the tile I'm moving to is ".", move to it
                position.y = k;
                continue step;
              }
            }
          }
          //if the tile I'm moving to is #, the instruction is complete
          if (board[position.y - 1][position.x] === "#") {
            continue instruction;
          }
          position.y--;
          break;
        case "down":
          //if the tile I'm moving to is " ", I'm actually wrapping around to the first "." or "#" of the column
          if (
            board[position.y + 1] === undefined ||
            board[position.y + 1][position.x] === " " ||
            board[position.y + 1][position.x] === undefined
          ) {
            for (let k = 0; k < board.length; k++) {
              if (board[k][position.x] === "#") {
                //if the tile I'm moving to is "#", the instruction is complete
                continue instruction;
              } else if (board[k][position.x] === ".") {
                //if the tile I'm moving to is ".", move to it
                position.y = k;
                continue step;
              }
            }
          }
          //if the tile I'm moving to is #, the instruction is complete
          if (board[position.y + 1][position.x] === "#") {
            continue instruction;
          }
          position.y++;
          break;
      }
    }
  } else {
    switch (instruction) {
      case "R":
        switch (position.direction) {
          case "right":
            position.direction = "down";
            break;
          case "left":
            position.direction = "up";
            break;
          case "up":
            position.direction = "right";
            break;
          case "down":
            position.direction = "left";
            break;
        }
        break;
      case "L":
        switch (position.direction) {
          case "right":
            position.direction = "up";
            break;
          case "left":
            position.direction = "down";
            break;
          case "up":
            position.direction = "left";
            break;
          case "down":
            position.direction = "right";
            break;
        }
        break;
    }
  }
}

let answer =
  (position.x + 1) * 4 +
  (position.y + 1) * 1000 +
  ["right", "down", "left", "up"].indexOf(position.direction);

console.log(answer);

/*
Warp Mapping

Moving right:
  rows 0-49 -> rows 149-100 in column 99 (now moving left)
  rows 50-99 -> columns 100-149 in row 49 (now moving up)
  rows 100-149 -> rows 49-0 in column 149 (now moving left)
  rows 150-199 -> columns 50-99 in row 149 (now moving up)

Moving left:
  rows 0-49 -> rows 149-100 in column 0 (now moving right)
  rows 50-99 -> columns 0-49 in row 100 (now moving down)
  rows 100-149 -> rows 49-0 in column 50 (now moving right)
  rows 150-199 -> columns 50-99 in row 0 (now moving down)

Moving up:
  columns 0-49 -> rows 50-99 in column 50 (now moving right)
  columns 50-99 -> rows 150-199 in column 0 (now moving right)
  columns 100-149 -> columns 0-49 in row 199 (now moving up)

Moving down:
  columns 0-49 -> columns 100-149 in row 0 (now moving down)
  columns 50-99 -> rows 150-199 in column 49 (now moving left)
  columns 100-149 -> rows 50-99 in column 99 (now moving left)

*/

position = { ...initialPosition };

//Oh my god I am so sorry for this code
instruction: for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i];
  if (typeof instruction === "number") {
    step: for (let j = 0; j < instruction; j++) {
      switch (position.direction) {
        case "right":
          //if the tile I'm moving to is #, the instruction is complete
          if (board[position.y][position.x + 1] === "#") {
            continue instruction;
          }
          //if the tile I'm moving to is " " or is off the board, I'm actually wrapping around the cube
          if (
            board[position.y][position.x + 1] === " " ||
            board[position.y][position.x + 1] === undefined
          ) {
            if (position.y < 50) {
              let newPositionItem = board[149 - position.y][99];
              if (newPositionItem === "#") {
                continue instruction;
              }
              position.x = 99;
              position.y = 149 - position.y;
              position.direction = "left";
              continue step;
            } else if (position.y >= 50 && position.y < 100) {
              let newPositionItem = board[49][50 + position.y];
              if (newPositionItem === "#") {
                continue instruction;
              }
              position.x = 50 + position.y;
              position.y = 49;
              position.direction = "up";
              continue step;
            } else if (position.y >= 100 && position.y < 150) {
              let newPositionItem = board[149 - position.y][149];
              if (newPositionItem === "#") {
                continue instruction;
              }
              position.x = 149;
              position.y = 149 - position.y;
              position.direction = "left";
              continue step;
            } else if (position.y >= 150) {
              let newPositionItem = board[149][position.y - 100];
              if (newPositionItem === "#") {
                continue instruction;
              }
              position.x = position.y - 100;
              position.y = 149;
              position.direction = "up";
              continue step;
            }
          }
          position.x++;
          break;
        case "left":
          //if the tile I'm moving to is #, the instruction is complete
          if (board[position.y][position.x - 1] === "#") {
            continue instruction;
          }
          //if the tile I'm moving to is " " or is off the board, I'm actually wrapping around the cube
          if (
            board[position.y][position.x - 1] === " " ||
            board[position.y][position.x - 1] === undefined
          ) {
            if (position.y < 50) {
              let newPositionItem = board[149 - position.y][0];
              if (newPositionItem === "#") {
                continue instruction;
              }
              position.x = 0;
              position.y = 149 - position.y;
              position.direction = "right";
              continue step;
            } else if (position.y >= 50 && position.y < 100) {
              let newPositionItem = board[100][position.y - 50];
              if (newPositionItem === "#") {
                continue instruction;
              }
              position.x = position.y - 50;
              position.y = 100;
              position.direction = "down";
              continue step;
            } else if (position.y >= 100 && position.y < 150) {
              let newPositionItem = board[149 - position.y][50];
              if (newPositionItem === "#") {
                continue instruction;
              }
              position.x = 50;
              position.y = 149 - position.y;
              position.direction = "right";
              continue step;
            } else if (position.y >= 150) {
              let newPositionItem = board[0][position.y - 100];
              if (newPositionItem === "#") {
                continue instruction;
              }
              position.x = position.y - 100;
              position.y = 0;
              position.direction = "down";
              continue step;
            }
          }
          position.x--;
          break;
        case "up":
          //if the tile I'm moving to is " " or is off the board, I'm actually wrapping around the cube
          if (
            board[position.y - 1] === undefined ||
            board[position.y - 1][position.x] === " " ||
            board[position.y - 1][position.x] === undefined
          ) {
            if (position.x < 50) {
              let newPositionItem = board[position.x + 50][50];
              if (newPositionItem === "#") {
                continue instruction;
              }
              position.y = position.x + 50;
              position.x = 50;
              position.direction = "right";
              continue step;
            } else if (position.x >= 50 && position.x < 100) {
              let newPositionItem = board[100 + position.x][0];
              if (newPositionItem === "#") {
                continue instruction;
              }
              position.y = 100 + position.x;
              position.x = 0;
              position.direction = "right";
              continue step;
            } else if (position.x >= 100) {
              let newPositionItem = board[199][position.x - 100];
              if (newPositionItem === "#") {
                continue instruction;
              }
              position.x = position.x - 100;
              position.y = 199;
              position.direction = "up";
              continue step;
            }
          }
          //if the tile I'm moving to is #, the instruction is complete
          if (board[position.y - 1][position.x] === "#") {
            continue instruction;
          }
          position.y--;
          break;
        case "down":
          //if the tile I'm moving to is " " or is off the board, I'm actually wrapping around the cube
          if (
            board[position.y + 1] === undefined ||
            board[position.y + 1][position.x] === " " ||
            board[position.y + 1][position.x] === undefined
          ) {
            if (position.x < 50) {
              let newPositionItem = board[0][100 + position.x];
              if (newPositionItem === "#") {
                continue instruction;
              }
              position.y = 0;
              position.x = 100 + position.x;
              position.direction = "down";
              continue step;
            } else if (position.x >= 50 && position.x < 100) {
              let newPositionItem = board[100 + position.x][49];
              if (newPositionItem === "#") {
                continue instruction;
              }
              position.y = 100 + position.x;
              position.x = 49;
              position.direction = "left";
              continue step;
            } else if (position.x >= 100) {
              let newPositionItem = board[position.x - 50][99];
              if (newPositionItem === "#") {
                continue instruction;
              }
              position.y = position.x - 50;
              position.x = 99;
              position.direction = "left";
              continue step;
            }
          }
          //if the tile I'm moving to is #, the instruction is complete
          if (board[position.y + 1][position.x] === "#") {
            continue instruction;
          }
          position.y++;
          break;
      }
    }
  } else {
    switch (instruction) {
      case "R":
        switch (position.direction) {
          case "right":
            position.direction = "down";
            break;
          case "left":
            position.direction = "up";
            break;
          case "up":
            position.direction = "right";
            break;
          case "down":
            position.direction = "left";
            break;
        }
        break;
      case "L":
        switch (position.direction) {
          case "right":
            position.direction = "up";
            break;
          case "left":
            position.direction = "down";
            break;
          case "up":
            position.direction = "left";
            break;
          case "down":
            position.direction = "right";
            break;
        }
        break;
    }
  }
}

answer =
  (position.x + 1) * 4 +
  (position.y + 1) * 1000 +
  ["right", "down", "left", "up"].indexOf(position.direction);

console.log(answer);
