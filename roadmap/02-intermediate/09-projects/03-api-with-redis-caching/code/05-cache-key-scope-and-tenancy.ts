import { logger } from "./shared/logger.js";
import { createApiPlatform } from "./module/bootstrap/api-platform.js";

const platform = createApiPlatform();

logger.info("Cache key scope and tenancy", {
  alphaProductKey: platform.cache.buildProductKey("tenant_alpha", "prod_alpha_1"),
  betaProductKey: platform.cache.buildProductKey("tenant_beta", "prod_beta_1"),
  alphaCatalogKey: platform.cache.buildCatalogKey("tenant_alpha"),
  betaCatalogKey: platform.cache.buildCatalogKey("tenant_beta"),
});
