import { cacheRuntime } from "./shared/api-cache-runtime.js";
import { logger } from "./shared/logger.js";
import { createApiPlatform } from "./module/bootstrap/api-platform.js";

async function main(): Promise<void> {
  const platform = createApiPlatform();

  await platform.controller.getProduct({
    tenantId: "tenant_alpha",
    productId: "prod_alpha_2",
    nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds,
  });
  await platform.controller.getCatalog({
    tenantId: "tenant_alpha",
    nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds,
  });

  const updated = await platform.controller.updatePrice({
    tenantId: "tenant_alpha",
    productId: "prod_alpha_2",
    priceInCents: 2100,
    nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds + 20,
  });

  const reloaded = await platform.controller.getProduct({
    tenantId: "tenant_alpha",
    productId: "prod_alpha_2",
    nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds + 25,
  });

  logger.info("Write path invalidation", {
    updatedStatus: updated.statusCode,
    reloadedStatus: reloaded.statusCode,
    metrics: platform.controller.metrics(),
  });
}

void main();
