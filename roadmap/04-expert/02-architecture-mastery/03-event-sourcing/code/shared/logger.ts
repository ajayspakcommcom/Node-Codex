type LogLevel = "info" | "warn" | "error";

export function createLogger(service: string) {
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
    info(event: string, metadata: Record<string, unknown>) {
      log("info", event, metadata);
    },
    warn(event: string, metadata: Record<string, unknown>) {
      log("warn", event, metadata);
    },
    error(event: string, metadata: Record<string, unknown>) {
      log("error", event, metadata);
    },
  };
}
