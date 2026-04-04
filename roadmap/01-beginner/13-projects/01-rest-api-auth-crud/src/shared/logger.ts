export interface LogMetadata {
  readonly [key: string]: unknown;
}

class Logger {
  public info(message: string, metadata?: LogMetadata): void {
    this.write("info", message, metadata);
  }

  public warn(message: string, metadata?: LogMetadata): void {
    this.write("warn", message, metadata);
  }

  public error(message: string, metadata?: LogMetadata): void {
    this.write("error", message, metadata);
  }

  private write(level: "info" | "warn" | "error", message: string, metadata?: LogMetadata): void {
    console.log(
      JSON.stringify({
        level,
        message,
        metadata,
        timestamp: new Date().toISOString(),
      }),
    );
  }
}

export const logger = new Logger();
