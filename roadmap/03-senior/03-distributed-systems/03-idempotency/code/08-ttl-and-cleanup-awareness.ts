import { createLogger } from "./shared/logger";

const logger = createLogger("ttl");

interface IdempotencyRetentionPolicy {
  readonly ttlHours: number;
  readonly reason: string;
}

const policy: IdempotencyRetentionPolicy = {
  ttlHours: 48,
  reason: "Keep records long enough to cover realistic retries without unbounded growth.",
};

logger.info("idempotency_ttl_policy", policy);
