import type { CounterIncrementResult, CounterStore } from "../../shared/rate-limit-types.js";

interface CounterEntry {
  count: number;
  resetAtEpochMs: number;
}

export class InMemoryCounterStore implements CounterStore {
  private readonly counters = new Map<string, CounterEntry>();

  public increment(key: string, windowMs: number): CounterIncrementResult {
    const now = Date.now();
    const existingEntry = this.counters.get(key);

    if (existingEntry === undefined || existingEntry.resetAtEpochMs <= now) {
      const nextEntry: CounterEntry = {
        count: 1,
        resetAtEpochMs: now + windowMs,
      };
      this.counters.set(key, nextEntry);
      return nextEntry;
    }

    existingEntry.count += 1;
    return existingEntry;
  }
}
