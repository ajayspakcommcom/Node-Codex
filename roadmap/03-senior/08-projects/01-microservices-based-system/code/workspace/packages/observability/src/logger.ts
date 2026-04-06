interface LogContext {
  readonly [key: string]: unknown;
}

export function createLogger(service: string) {
  return {
    info(eventName: string, context: LogContext = {}): void {
      console.log(
        JSON.stringify({
          level: "info",
          service,
          eventName,
          timestamp: new Date().toISOString(),
          context,
        }),
      );
    },
  };
}
