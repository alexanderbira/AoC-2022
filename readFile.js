import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export default async function read(url) {
  return await readFile(join(dirname(fileURLToPath(url)), "input.txt"), "utf8");
}
