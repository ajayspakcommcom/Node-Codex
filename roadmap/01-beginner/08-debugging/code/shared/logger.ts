export interface LoggerContext {
  readonly requestId?: string;
  readonly route?: string;
  readonly actorId?: string;
  readonly operation?: string;
}

export interface Logger {
  info(message: string, context?: LoggerContext & Readonly<Record<string, unknown>>): void;
  error(message: string, context?: LoggerContext & Readonly<Record<string, unknown>>): void;
}

export function createLogger(service: string): Logger {
  return {
    info(message: string, context: LoggerContext & Readonly<Record<string, unknown>> = {}): void {
      console.log(`[${service}] ${message}`, context);
    },
    error(message: string, context: LoggerContext & Readonly<Record<string, unknown>> = {}): void {
      console.error(`[${service}] ${message}`, context);
    },
  };
}
