export interface Logger {
  info(event: string, metadata: Record<string, unknown>): void;
  warn(event: string, metadata: Record<string, unknown>): void;
  error(event: string, metadata: Record<string, unknown>): void;
}

type LogLevel = "info" | "warn" | "error";

export function createLogger(service: string): Logger {
  function log(level: LogLevel, event: string, metadata: Record<string, unknown>): void {
    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        level,
        service,
        event,
        ...metadata,
      }),
    );
  }

  return {
    info(event, metadata) {
      log("info", event, metadata);
    },
    warn(event, metadata) {
      log("warn", event, metadata);
    },
    error(event, metadata) {
      log("error", event, metadata);
    },
  };
}
