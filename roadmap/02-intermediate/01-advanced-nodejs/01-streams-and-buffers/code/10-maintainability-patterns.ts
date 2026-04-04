import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import type { Transform } from "node:stream";

import { LinePrefixTransform } from "./shared/line-prefix-transform";
import { logger } from "./shared/logger";

class ExportService {
  public async prefixAndCopyFile(inputPath: string, outputPath: string, transform: Transform): Promise<void> {
    await pipeline(fs.createReadStream(inputPath), transform, fs.createWriteStream(outputPath));
  }
}

async function run(): Promise<void> {
  const inputPath = path.resolve(
    "roadmap/02-intermediate/01-advanced-nodejs/01-streams-and-buffers/code/assets/sample-input.txt",
  );
  const outputPath = path.resolve(
    "roadmap/02-intermediate/01-advanced-nodejs/01-streams-and-buffers/code/assets/maintainable-output.txt",
  );

  const exportService = new ExportService();
  await exportService.prefixAndCopyFile(inputPath, outputPath, new LinePrefixTransform("[service] "));

  logger.info("Maintainable streaming pattern executed", {
    inputPath,
    outputPath,
    rule: "Keep stream orchestration in a service boundary instead of embedding it inside route handlers.",
  });
}

void run();
