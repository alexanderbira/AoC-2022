import read from "../readFile.js";
const input = await read(25);

const snafuNums = input.split("\n");

const snafuToDec = (snafu) => {
  const digits = snafu.split("").reverse();
  let dec = 0;
  for (let i = 0; i < digits.length; i++) {
    let powerOfFive = 5 ** i;
    switch (digits[i]) {
      case "0":
        break;
      case "1":
        dec += powerOfFive;
        break;
      case "2":
        dec += 2 * powerOfFive;
        break;
      case "-":
        dec -= powerOfFive;
        break;
      case "=":
        dec -= 2 * powerOfFive;
    }
  }
  return dec;
};

const decToSnafu = (dec) => {
  //get the number of digits
  let numDigits = 1;
  while (snafuToDec("2".repeat(numDigits)) < dec) {
    numDigits++;
  }
  let snafu = "=".repeat(numDigits).split("");

  //find the first digit (either 1 or 2)
  snafu[0] = "2";
  if (snafuToDec(snafu.join("")) > dec) {
    snafu[0] = "1";
  }

  const snafuDigits = ["=", "-", "0", "1", "2"];

  for (let digit = 1; digit < numDigits; digit++) {
    //find the last digit that does not go over dec
    let lastDigit = 0;
    while (snafuToDec(snafu.join("")) <= dec && lastDigit < 5) {
      if (snafuToDec(snafu.join("")) === dec) {
        return snafu.join("");
      }
      lastDigit++;
      snafu[digit] = snafuDigits[lastDigit];
    }

    lastDigit--;
    snafu[digit] = snafuDigits[lastDigit];
  }

  return snafu.join("");
};

const sum = snafuNums.reduce((acc, snafu) => acc + snafuToDec(snafu), 0);

console.log(decToSnafu(sum));
