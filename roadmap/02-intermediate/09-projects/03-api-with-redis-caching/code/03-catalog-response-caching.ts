import { cacheRuntime } from "./shared/api-cache-runtime.js";
import { logger } from "./shared/logger.js";
import { createApiPlatform } from "./module/bootstrap/api-platform.js";

async function main(): Promise<void> {
  const platform = createApiPlatform();

  const firstCatalog = await platform.controller.getCatalog({
    tenantId: "tenant_alpha",
    nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds,
  });

  const secondCatalog = await platform.controller.getCatalog({
    tenantId: "tenant_alpha",
    nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds + 30,
  });

  logger.info("Catalog response caching", {
    firstStatus: firstCatalog.statusCode,
    secondStatus: secondCatalog.statusCode,
    metrics: platform.controller.metrics(),
    keys: "snapshotKeys" in platform.cacheClient ? platform.cacheClient.snapshotKeys() : [],
  });
}

void main();
