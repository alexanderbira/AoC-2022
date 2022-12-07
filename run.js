const arg = process.argv[2].toString().padStart(2, "0");
console.log(`Running Day ${arg}:`);
import(`./day${arg}/day${arg}.js`).catch((err) => {
  console.log("Error:", err);
});
