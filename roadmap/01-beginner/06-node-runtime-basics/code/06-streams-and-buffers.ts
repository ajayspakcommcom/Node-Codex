import { Readable } from "node:stream";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("streams-and-buffers");

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const sampleFilePath = path.join(currentDir, "assets", "sample-data.txt");

async function main(): Promise<void> {
  const buffer = await readFile(sampleFilePath);
  const firstBytes = buffer.subarray(0, 12);
  const stream = Readable.from(buffer.toString("utf8").split("\n"));

  logger.info("Buffer example", {
    byteLength: buffer.byteLength,
    preview: firstBytes.toString("utf8"),
  });

  for await (const chunk of stream) {
    logger.info("Stream chunk", { chunk });
  }
}

void main();
