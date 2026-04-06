import { createLogger } from "./shared/logger";

const logger = createLogger("thresholds");

interface BreakerPolicy {
  readonly failureThreshold: number;
  readonly resetTimeoutMs: number;
  readonly reason: string;
}

const paymentGatewayPolicy: BreakerPolicy = {
  failureThreshold: 5,
  resetTimeoutMs: 30_000,
  reason: "Protect customer-facing latency while allowing a controlled recovery probe.",
};

logger.info("breaker_policy", paymentGatewayPolicy);
