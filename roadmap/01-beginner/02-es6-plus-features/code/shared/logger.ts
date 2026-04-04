export interface LoggerContext {
  readonly requestId?: string;
  readonly service: string;
}

export interface Logger {
  info(message: string, metadata?: Readonly<Record<string, unknown>>): void;
}

export function createLogger({ service, requestId }: LoggerContext): Logger {
  return {
    info(message: string, metadata: Readonly<Record<string, unknown>> = {}): void {
      const prefix = requestId ? `[${service}] requestId=${requestId}` : `[${service}]`;
      console.log(`${prefix} ${message}`, metadata);
    },
  };
}
