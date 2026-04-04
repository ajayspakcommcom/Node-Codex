import { Writable } from "node:stream";

import { logger } from "./shared/logger";

class SlowWritable extends Writable {
  public override _write(
    chunk: Buffer | string,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ): void {
    setTimeout(() => {
      logger.info("Slow consumer processed chunk", {
        bytes: Buffer.byteLength(chunk),
      });
      callback();
    }, 25);
  }
}

async function run(): Promise<void> {
  const writable = new SlowWritable({ highWaterMark: 16 });

  for (let index = 0; index < 5; index += 1) {
    const canContinue = writable.write(`chunk-${index}-payload\n`);

    logger.info("Producer write result", {
      index,
      canContinue,
    });

    if (!canContinue) {
      logger.warn("Backpressure applied", {
        index,
      });
      await new Promise<void>((resolve) => writable.once("drain", resolve));
      logger.info("Drain received, producer resumed", {
        index,
      });
    }
  }

  writable.end();
}

void run();
