export class ConcurrencyLimiter {
  #active = 0;

  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent;
  }

  async run(task) {
    if (this.#active >= this.maxConcurrent) {
      throw new Error("concurrency limit reached");
    }

    this.#active += 1;
    try {
      return await task();
    } finally {
      this.#active -= 1;
    }
  }

  currentActive() {
    return this.#active;
  }
}
