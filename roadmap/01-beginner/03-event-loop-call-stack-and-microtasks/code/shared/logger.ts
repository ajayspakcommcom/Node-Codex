export interface Logger {
  info(message: string, metadata?: Readonly<Record<string, unknown>>): void;
}

export function createLogger(service: string): Logger {
  return {
    info(message: string, metadata: Readonly<Record<string, unknown>> = {}): void {
      console.log(`[${service}] ${message}`, metadata);
    },
  };
}
