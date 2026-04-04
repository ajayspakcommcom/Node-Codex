import fs from "node:fs";
import path from "node:path";

import { logger } from "./shared/logger.js";

const inputPath = path.resolve(
  "roadmap/02-intermediate/01-advanced-nodejs/03-memory-management/code/assets/sample-payload.txt",
);

const bufferedPayload = fs.readFileSync(inputPath);
const streamingPayload = fs.createReadStream(inputPath);

logger.info("Buffer vs stream tradeoff", {
  bufferedBytes: bufferedPayload.byteLength,
  streamReadableHighWaterMark: streamingPayload.readableHighWaterMark,
  guidance: "Buffers load all content at once. Streams are usually safer for large or continuous payloads.",
});

streamingPayload.close();
