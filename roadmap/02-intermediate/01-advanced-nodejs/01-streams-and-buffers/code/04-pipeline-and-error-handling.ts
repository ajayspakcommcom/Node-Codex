import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";

import { LinePrefixTransform } from "./shared/line-prefix-transform";
import { logger } from "./shared/logger";

async function run(): Promise<void> {
  const inputPath = path.resolve(
    "roadmap/02-intermediate/01-advanced-nodejs/01-streams-and-buffers/code/assets/sample-input.txt",
  );
  const outputPath = path.resolve(
    "roadmap/02-intermediate/01-advanced-nodejs/01-streams-and-buffers/code/assets/sample-output.txt",
  );

  try {
    await pipeline(
      fs.createReadStream(inputPath),
      new LinePrefixTransform("[pipeline] "),
      fs.createWriteStream(outputPath),
    );

    logger.info("Pipeline completed", {
      inputPath,
      outputPath,
    });
  } catch (error) {
    logger.error("Pipeline failed", {
      error,
    });
  }
}

void run();
