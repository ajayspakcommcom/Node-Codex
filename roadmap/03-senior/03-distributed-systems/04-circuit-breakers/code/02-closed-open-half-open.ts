import { CircuitBreaker, type DependencyCall } from "./shared/circuit-breaker";
import { createLogger } from "./shared/logger";

const logger = createLogger("state-machine");

const failingCall: DependencyCall<string> = async () => {
  throw new Error("gateway unavailable");
};

async function main(): Promise<void> {
  const breaker = new CircuitBreaker<string>({
    failureThreshold: 2,
    resetTimeoutMs: 1,
    logger,
  });

  await breaker.execute(failingCall).catch(() => undefined);
  await breaker.execute(failingCall).catch(() => undefined);
  await breaker.execute(failingCall).catch(() => undefined);

  await new Promise((resolve) => setTimeout(resolve, 5));

  await breaker.execute(async () => "recovered").catch(() => undefined);
}

void main();
