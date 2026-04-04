import fs from "node:fs";
import path from "node:path";

import { logger } from "./shared/logger";

const inputPath = path.resolve(
  "roadmap/02-intermediate/01-advanced-nodejs/01-streams-and-buffers/code/assets/sample-input.txt",
);

const stream = fs.createReadStream(inputPath, {
  highWaterMark: 8,
});

stream.on("data", (chunk: Buffer) => {
  logger.info("Chunk received", {
    bytes: chunk.byteLength,
    preview: chunk.toString(),
  });
});

stream.on("end", () => {
  logger.info("Stream ended", {
    note: "A lower highWaterMark increases chunk frequency and can change memory/throughput tradeoffs.",
  });
});
