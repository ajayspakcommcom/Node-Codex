import { readTempFile } from "../../shared/libuv-runtime.js";

export class FilesystemWorkloadAnalyzer {
  public async runReads(readCount: number): Promise<{
    readonly readCount: number;
    readonly durationsMs: readonly number[];
    readonly averageMs: number;
  }> {
    const durationsMs: number[] = [];

    for (let index = 0; index < readCount; index += 1) {
      durationsMs.push(await readTempFile());
    }

    const averageMs = durationsMs.reduce((sum, duration) => sum + duration, 0) / durationsMs.length;

    return {
      readCount,
      durationsMs,
      averageMs,
    };
  }
}
