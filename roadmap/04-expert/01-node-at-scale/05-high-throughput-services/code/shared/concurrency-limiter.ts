export class ConcurrencyLimiter {
  private active = 0;

  constructor(private readonly maxConcurrent: number) {}

  async run<T>(task: () => Promise<T>): Promise<T> {
    if (this.active >= this.maxConcurrent) {
      throw new Error("concurrency limit reached");
    }

    this.active += 1;
    try {
      return await task();
    } finally {
      this.active -= 1;
    }
  }

  currentActive(): number {
    return this.active;
  }
}
