export interface LoggerContext {
  readonly [key: string]: unknown;
}

export interface Logger {
  info(message: string, context?: LoggerContext): void;
}

export function createLogger(scope: string): Logger {
  return {
    info(message: string, context: LoggerContext = {}): void {
      console.log(
        JSON.stringify({
          level: "info",
          scope,
          message,
          context,
          timestamp: new Date().toISOString(),
        }),
      );
    },
  };
}
