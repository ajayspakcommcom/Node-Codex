export class ProcessedMessageStore {
  private readonly processed = new Set<string>();

  has(messageId: string): boolean {
    return this.processed.has(messageId);
  }

  record(messageId: string): void {
    this.processed.add(messageId);
  }
}
