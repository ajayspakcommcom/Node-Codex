import { CircuitBreaker } from "./shared/circuit-breaker";
import { createLogger } from "./shared/logger";

const logger = createLogger("fallbacks");

async function main(): Promise<void> {
  const breaker = new CircuitBreaker<string>({
    failureThreshold: 1,
    resetTimeoutMs: 30_000,
    logger,
  });

  const result = await breaker.execute(
    async () => {
      throw new Error("recommendation engine unavailable");
    },
    async () => "serve-cached-recommendations",
  );

  logger.info("fallback_result", {
    result,
    note: "Fallbacks should degrade intentionally rather than fabricate correctness.",
  });
}

void main();
