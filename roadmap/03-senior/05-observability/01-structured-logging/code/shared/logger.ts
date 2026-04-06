interface BaseMetadata {
  readonly service: string;
  readonly environment: string;
  readonly version: string;
  readonly region?: string;
}

interface LogContext {
  readonly [key: string]: unknown;
}

type LogLevel = "info" | "warn" | "error";

function log(level: LogLevel, metadata: BaseMetadata, eventName: string, context: LogContext): void {
  console.log(
    JSON.stringify({
      level,
      eventName,
      timestamp: new Date().toISOString(),
      ...metadata,
      context,
    }),
  );
}

export function createLogger(metadata: BaseMetadata) {
  return {
    info(eventName: string, context: LogContext = {}): void {
      log("info", metadata, eventName, context);
    },
    warn(eventName: string, context: LogContext = {}): void {
      log("warn", metadata, eventName, context);
    },
    error(eventName: string, context: LogContext = {}): void {
      log("error", metadata, eventName, context);
    },
  };
}

export function createAuditLogger(metadata: BaseMetadata) {
  return {
    info(eventName: string, context: LogContext = {}): void {
      log("info", metadata, eventName, {
        logType: "audit",
        ...context,
      });
    },
  };
}

export function redactFields<T extends Record<string, unknown>>(
  payload: T,
  sensitiveFields: readonly string[],
): T {
  const clone = { ...payload };

  for (const field of sensitiveFields) {
    if (field in clone) {
      clone[field as keyof T] = "***redacted***" as T[keyof T];
    }
  }

  return clone;
}

export function shouldSample(index: number, everyNth: number): boolean {
  return index % everyNth === 0;
}
