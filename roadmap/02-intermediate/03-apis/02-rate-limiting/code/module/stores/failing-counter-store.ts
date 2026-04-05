import type { CounterIncrementResult, CounterStore } from "../../shared/rate-limit-types.js";

export class CounterStoreUnavailableError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "CounterStoreUnavailableError";
  }
}

export class FailingCounterStore implements CounterStore {
  public increment(_key: string, _windowMs: number): CounterIncrementResult {
    throw new CounterStoreUnavailableError("The shared counter store is unavailable.");
  }
}
