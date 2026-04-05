import { RedisLikeClient } from "./module/clients/redis-like-client.js";
import { TemporaryStateCache } from "./module/cache/temporary-state-cache.js";
import { VerificationCodeService } from "./module/services/verification-code-service.js";
import { CacheMetrics } from "./shared/cache-runtime.js";
import { logger } from "./shared/logger.js";

void main();

async function main(): Promise<void> {
  const cacheMetrics = new CacheMetrics();
  const verificationCodeService = new VerificationCodeService(
    new TemporaryStateCache(new RedisLikeClient(), {
      keyPrefix: "temporary-state-demo",
      verificationCodeTtlMs: 30_000,
    }),
    cacheMetrics,
  );

  await verificationCodeService.issueCode("tenant_alpha", "user_42", "482190");
  const firstVerification = await verificationCodeService.verifyCode("tenant_alpha", "user_42", "482190");
  const secondVerification = await verificationCodeService.verifyCode("tenant_alpha", "user_42", "482190");

  logger.info("Shared temporary state", {
    firstVerification,
    secondVerification,
    cacheMetrics: cacheMetrics.snapshot(),
    guidance: "Redis is often used for short-lived shared state such as verification codes, where TTL and explicit cleanup matter as much as raw speed.",
  });
}
