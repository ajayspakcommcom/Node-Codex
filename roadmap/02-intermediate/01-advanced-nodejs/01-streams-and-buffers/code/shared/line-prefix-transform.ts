import { Transform } from "node:stream";

export class LinePrefixTransform extends Transform {
  private pendingLine = "";
  public constructor(private readonly prefix: string) {
    super();
  }

  public override _transform(
    chunk: Buffer | string,
    _encoding: BufferEncoding,
    callback: (error?: Error | null, data?: Buffer | string) => void,
  ): void {
    const text = this.pendingLine + chunk.toString();
    const lines = text.split("\n");
    this.pendingLine = lines.pop() ?? "";

    const output = lines.map((line) => `${this.prefix}${line}\n`).join("");
    callback(null, output);
  }

  public override _flush(callback: (error?: Error | null, data?: Buffer | string) => void): void {
    if (this.pendingLine.length > 0) {
      callback(null, `${this.prefix}${this.pendingLine}\n`);
      return;
    }

    callback();
  }
}
