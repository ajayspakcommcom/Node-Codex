import { cacheRuntime } from "./shared/api-cache-runtime.js";
import { logger } from "./shared/logger.js";
import { createApiPlatform } from "./module/bootstrap/api-platform.js";

async function main(): Promise<void> {
  const platform = createApiPlatform();

  const firstRead = await platform.controller.getProduct({
    tenantId: "tenant_alpha",
    productId: "prod_alpha_1",
    nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds,
  });

  const secondRead = await platform.controller.getProduct({
    tenantId: "tenant_alpha",
    productId: "prod_alpha_1",
    nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds + 10,
  });

  logger.info("Cache aside product read", {
    firstStatus: firstRead.statusCode,
    secondStatus: secondRead.statusCode,
    metrics: platform.controller.metrics(),
  });
}

void main();
