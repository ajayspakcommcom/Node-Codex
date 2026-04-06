import { type Logger } from "./logger";

export type DependencyCall<TResult> = () => Promise<TResult>;

type BreakerState = "closed" | "open" | "half_open";

interface CircuitBreakerOptions {
  readonly failureThreshold: number;
  readonly resetTimeoutMs: number;
  readonly logger: Logger;
}

export class CircuitBreaker<TResult> {
  private state: BreakerState = "closed";

  private failureCount = 0;

  private openedAt = 0;

  constructor(private readonly options: CircuitBreakerOptions) {}

  async execute(
    operation: DependencyCall<TResult>,
    fallback?: () => Promise<TResult>,
  ): Promise<TResult> {
    if (this.state === "open") {
      const now = Date.now();

      if (now - this.openedAt < this.options.resetTimeoutMs) {
        this.options.logger.info("breaker_open_blocking_call", {
          state: this.state,
        });

        if (fallback) {
          return fallback();
        }

        throw new Error("Circuit breaker is open");
      }

      this.transitionTo("half_open");
    }

    try {
      const result = await operation();
      this.failureCount = 0;
      this.transitionTo("closed");
      return result;
    } catch (error) {
      this.failureCount += 1;

      this.options.logger.info("dependency_failure_recorded", {
        failureCount: this.failureCount,
        state: this.state,
        error: error instanceof Error ? error.message : "Unknown error",
      });

      if (this.failureCount >= this.options.failureThreshold) {
        this.openedAt = Date.now();
        this.transitionTo("open");
      }

      if (fallback) {
        return fallback();
      }

      throw error;
    }
  }

  private transitionTo(nextState: BreakerState): void {
    if (this.state === nextState) {
      return;
    }

    this.options.logger.info("breaker_state_transition", {
      from: this.state,
      to: nextState,
    });

    this.state = nextState;
  }
}
