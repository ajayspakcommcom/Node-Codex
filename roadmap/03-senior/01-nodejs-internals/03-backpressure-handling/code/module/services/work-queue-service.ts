import type { QueueSnapshot, WorkItem } from "../../shared/backpressure-types.js";

export class WorkQueueService {
  private readonly queue: WorkItem[] = [];
  private accepted = 0;
  private rejected = 0;
  private processed = 0;

  public constructor(private readonly capacity: number) {}

  public tryEnqueue(item: WorkItem): boolean {
    if (this.queue.length >= this.capacity) {
      this.rejected += 1;
      return false;
    }

    this.queue.push(item);
    this.accepted += 1;
    return true;
  }

  public processNext(): WorkItem | undefined {
    const next = this.queue.shift();

    if (next !== undefined) {
      this.processed += 1;
    }

    return next;
  }

  public snapshot(): QueueSnapshot {
    return {
      queuedItems: this.queue.length,
      accepted: this.accepted,
      rejected: this.rejected,
      processed: this.processed,
    };
  }
}
