import { cacheRuntime } from "./shared/api-cache-runtime.js";
import { logger } from "./shared/logger.js";
import { createApiPlatform } from "./module/bootstrap/api-platform.js";

async function main(): Promise<void> {
  const platform = createApiPlatform({
    stampedeProtection: true,
  });

  const [first, second, third] = await Promise.all([
    platform.service.getProduct({
      tenantId: "tenant_alpha",
      productId: "prod_alpha_1",
      nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds,
    }),
    platform.service.getProduct({
      tenantId: "tenant_alpha",
      productId: "prod_alpha_1",
      nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds,
    }),
    platform.service.getProduct({
      tenantId: "tenant_alpha",
      productId: "prod_alpha_1",
      nowEpochSeconds: cacheRuntime.defaultNowEpochSeconds,
    }),
  ]);

  logger.info("Cache stampede protection", {
    allSameProduct: first.id === second.id && second.id === third.id,
    metrics: platform.service.metricsSnapshot(),
  });
}

void main();
