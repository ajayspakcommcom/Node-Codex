import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";

import { logger } from "./shared/logger";

async function copyFileWithStreaming(): Promise<void> {
  const inputPath = path.resolve(
    "roadmap/02-intermediate/01-advanced-nodejs/01-streams-and-buffers/code/assets/sample-input.txt",
  );
  const outputPath = path.resolve(
    "roadmap/02-intermediate/01-advanced-nodejs/01-streams-and-buffers/code/assets/copied-sample-input.txt",
  );

  await pipeline(fs.createReadStream(inputPath), fs.createWriteStream(outputPath));

  logger.info("Large-file-safe copy completed", {
    inputPath,
    outputPath,
  });
}

void copyFileWithStreaming();
