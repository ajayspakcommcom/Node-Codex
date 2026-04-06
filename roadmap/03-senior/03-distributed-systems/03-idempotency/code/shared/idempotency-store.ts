export interface IdempotencyRecord {
  readonly status: "in_progress" | "completed";
  readonly responseId: string;
}

export class IdempotencyStore {
  private readonly store = new Map<string, IdempotencyRecord>();

  get(key: string): IdempotencyRecord | undefined {
    return this.store.get(key);
  }

  markInProgress(key: string): void {
    this.store.set(key, {
      status: "in_progress",
      responseId: "",
    });
  }

  markCompleted(key: string, responseId: string): void {
    this.store.set(key, {
      status: "completed",
      responseId,
    });
  }
}
