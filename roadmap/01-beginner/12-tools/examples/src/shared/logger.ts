export interface LoggerContext {
  readonly service: string;
  readonly level: string;
}

export class Logger {
  public constructor(private readonly context: LoggerContext) {}

  public info(message: string, metadata?: Record<string, unknown>): void {
    console.log(
      JSON.stringify({
        level: this.context.level,
        service: this.context.service,
        message,
        metadata,
      }),
    );
  }
}
