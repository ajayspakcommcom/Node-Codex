import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

import { LinePrefixTransform } from "./shared/line-prefix-transform";
import { logger } from "./shared/logger";

async function run(): Promise<void> {
  const input = Readable.from(["alpha\nbeta\ngamma\n"]);
  const outputChunks: string[] = [];

  await pipeline(
    input,
    new LinePrefixTransform("[transformed] "),
    async function* (source) {
      for await (const chunk of source) {
        outputChunks.push(chunk.toString());
        yield chunk;
      }
    },
  );

  logger.info("Transform output", {
    output: outputChunks.join(""),
  });
}

void run();
