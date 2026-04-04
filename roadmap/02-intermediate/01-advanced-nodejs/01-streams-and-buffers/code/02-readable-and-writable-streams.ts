import { Writable } from "node:stream";

import { logger } from "./shared/logger";

class MetricsWritable extends Writable {
  private bytesWritten = 0;

  public override _write(
    chunk: Buffer | string,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ): void {
    this.bytesWritten += Buffer.byteLength(chunk);
    logger.info("Writable consumed chunk", {
      chunkBytes: Buffer.byteLength(chunk),
      totalBytesWritten: this.bytesWritten,
    });
    callback();
  }
}

async function run(): Promise<void> {
  const writable = new MetricsWritable();
  writable.write("first line\n");
  writable.write("second line\n");
  writable.end("third line\n");
}

void run();
