import { RegionRouter } from "./control-plane/region-router.js";
import { RegionRegistry } from "./control-plane/region-registry.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("multi-region");

const registry = new RegionRegistry([
  { region: "ap-south-1", healthy: true },
  { region: "eu-west-1", healthy: true },
]);

const router = new RegionRouter(registry);

logger.info("region_routing_example", {
  routedRegion: router.route({
    tenantId: "tenant-in",
    primaryRegion: "ap-south-1",
    allowedFailoverRegions: ["eu-west-1"],
    residency: "apac",
  }),
});
