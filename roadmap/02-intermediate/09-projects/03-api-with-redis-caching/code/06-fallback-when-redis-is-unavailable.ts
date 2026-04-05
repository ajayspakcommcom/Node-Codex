import { cacheRuntime } from "./shared/api-cache-runtime.js";
import { logger } from "./shared/logger.js";
import { FailingRedisClient } from "./module/clients/failing-redis-client.js";
import { createApiPlatform } from "./module/bootstrap/api-platform.js";

async function main(): Promise<void> {
  const platform = createApiPlatform({
    cacheClient: new FailingRedisClient(),
  });

  const read = await platform.controller.getProduct({
    tenantId: "tenant_alpha",
    productId: "prod_alpha_1",
    nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds,
  });

  const write = await platform.controller.updatePrice({
    tenantId: "tenant_alpha",
    productId: "prod_alpha_1",
    priceInCents: 2600,
    nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds + 15,
  });

  logger.warn("Fallback when redis is unavailable", {
    readStatus: read.statusCode,
    writeStatus: write.statusCode,
    metrics: platform.controller.metrics(),
  });
}

void main();
