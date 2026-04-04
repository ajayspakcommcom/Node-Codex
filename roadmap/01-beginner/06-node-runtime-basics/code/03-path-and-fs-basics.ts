import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("path-and-fs");

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const sampleFilePath = path.join(currentDir, "assets", "sample-data.txt");

async function main(): Promise<void> {
  const data = await readFile(sampleFilePath, "utf8");

  logger.info("Read sample file safely using path utilities", {
    sampleFilePath,
    firstLine: data.split("\n")[0],
  });
}

void main();
