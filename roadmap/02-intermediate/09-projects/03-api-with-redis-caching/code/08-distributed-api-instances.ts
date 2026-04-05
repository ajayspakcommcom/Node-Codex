import { cacheRuntime } from "./shared/api-cache-runtime.js";
import { logger } from "./shared/logger.js";
import { RedisLikeClient } from "./module/clients/redis-like-client.js";
import { createApiPlatform } from "./module/bootstrap/api-platform.js";

async function main(): Promise<void> {
  const sharedRedis = new RedisLikeClient();
  const firstNode = createApiPlatform({ cacheClient: sharedRedis });
  const secondNode = createApiPlatform({ cacheClient: sharedRedis });

  await firstNode.controller.getCatalog({
    tenantId: "tenant_alpha",
    nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds,
  });

  await secondNode.controller.getCatalog({
    tenantId: "tenant_alpha",
    nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds + 10,
  });

  logger.info("Distributed API instances", {
    firstNodeMetrics: firstNode.controller.metrics(),
    secondNodeMetrics: secondNode.controller.metrics(),
    sharedKeys: sharedRedis.snapshotKeys(),
  });
}

void main();
