type SpanAttributes = Record<string, string>;

export class SimpleSpan {
  readonly traceId: string;

  readonly spanId: string;

  readonly parentSpanId?: string;

  private readonly startedAt: string;

  private endedAt?: string;

  constructor(
    private readonly name: string,
    parent?: SimpleSpan,
    private readonly attributes: SpanAttributes = {},
  ) {
    this.traceId = parent?.traceId ?? randomId(32);
    this.spanId = randomId(16);
    this.parentSpanId = parent?.spanId;
    this.startedAt = new Date().toISOString();
  }

  end(): void {
    this.endedAt = new Date().toISOString();
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      traceId: this.traceId,
      spanId: this.spanId,
      parentSpanId: this.parentSpanId,
      startedAt: this.startedAt,
      endedAt: this.endedAt,
      attributes: this.attributes,
    };
  }
}

export class SimpleTracer {
  constructor(private readonly serviceName: string) {}

  startSpan(name: string, parent?: SimpleSpan, attributes: SpanAttributes = {}): SimpleSpan {
    return new SimpleSpan(name, parent, {
      "service.name": this.serviceName,
      ...attributes,
    });
  }
}

function randomId(length: number): string {
  const alphabet = "abcdef0123456789";
  let value = "";

  for (let index = 0; index < length; index += 1) {
    value += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return value;
}
