export interface MessageEnvelope<TPayload = Record<string, unknown>> {
  readonly messageId: string;
  readonly eventName: string;
  readonly payload: TPayload;
}

export function createMessageEnvelope<TPayload extends Record<string, unknown>>(
  eventName: string,
  payload: TPayload,
): MessageEnvelope<TPayload> {
  return {
    messageId: `msg_${Math.random().toString(36).slice(2, 10)}`,
    eventName,
    payload,
  };
}
