export interface EventEnvelope<TPayload = Record<string, unknown>> {
  readonly messageId: string;
  readonly eventName: string;
  readonly schemaVersion: number;
  readonly occurredAt: string;
  readonly payload: TPayload;
}

export function createEnvelope<TPayload extends Record<string, unknown>>(
  eventName: string,
  payload: TPayload,
  schemaVersion = 1,
): EventEnvelope<TPayload> {
  return {
    messageId: `msg_${Math.random().toString(36).slice(2, 10)}`,
    eventName,
    schemaVersion,
    occurredAt: new Date().toISOString(),
    payload,
  };
}
