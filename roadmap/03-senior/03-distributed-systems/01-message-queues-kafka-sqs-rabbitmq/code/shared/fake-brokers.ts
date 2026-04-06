interface SqsMessage<TBody> {
  readonly body: TBody;
  readonly receiveCount: number;
}

interface StoredMessage<TBody> {
  body: TBody;
  receiveCount: number;
}

export class FakeSqsQueue<TBody extends { messageId: string }> {
  private readonly queue: StoredMessage<TBody>[] = [];

  private readonly deadLetterQueue: StoredMessage<TBody>[] = [];

  constructor(private readonly maxReceivesBeforeDeadLetter = 3) {}

  send(body: TBody): void {
    this.queue.push({ body, receiveCount: 0 });
  }

  receive(): SqsMessage<TBody> | null {
    const message = this.queue.at(0);

    if (!message) {
      return null;
    }

    message.receiveCount += 1;

    return {
      body: message.body,
      receiveCount: message.receiveCount,
    };
  }

  ack(message: SqsMessage<TBody>): void {
    const index = this.queue.findIndex(
      (item) => item.body.messageId === message.body.messageId,
    );

    if (index >= 0) {
      this.queue.splice(index, 1);
    }
  }

  fail(message: SqsMessage<TBody>): void {
    if (message.receiveCount >= this.maxReceivesBeforeDeadLetter) {
      this.deadLetterQueue.push({
        body: message.body,
        receiveCount: message.receiveCount,
      });
      this.ack(message);
    }
  }

  deadLetterQueueDepth(): number {
    return this.deadLetterQueue.length;
  }
}

interface Binding {
  readonly queueName: string;
  readonly pattern: string;
}

export class FakeRabbitExchange {
  private readonly bindings: Binding[] = [];

  bindQueue(queueName: string, pattern: string): void {
    this.bindings.push({ queueName, pattern });
  }

  publish(routingKey: string, _payload: Record<string, unknown>): string[] {
    return this.bindings
      .filter((binding) => matches(binding.pattern, routingKey))
      .map((binding) => binding.queueName);
  }
}

function matches(pattern: string, routingKey: string): boolean {
  if (pattern === "#") {
    return true;
  }

  if (pattern.endsWith(".*")) {
    return routingKey.startsWith(pattern.slice(0, -1));
  }

  return pattern === routingKey;
}
