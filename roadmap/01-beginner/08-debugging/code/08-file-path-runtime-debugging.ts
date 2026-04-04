import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("file-path-debugging");

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const configPath = path.join(currentDir, "assets", "debug-config.json");

async function main(): Promise<void> {
  const content = await readFile(configPath, "utf8");

  logger.info("Runtime file path investigation", {
    cwd: process.cwd(),
    currentFilePath,
    currentDir,
    configPath,
    configLength: content.length,
  });
}

void main();
