import type { SchedulingEntry } from "../../shared/event-loop-types.js";

export class SchedulingAnalyzer {
  private readonly entries: SchedulingEntry[] = [];
  private sequence = 0;

  public record(queue: SchedulingEntry["queue"], label: string): void {
    this.sequence += 1;
    this.entries.push({
      order: this.sequence,
      queue,
      label,
    });
  }

  public snapshot(): readonly SchedulingEntry[] {
    return [...this.entries];
  }
}
