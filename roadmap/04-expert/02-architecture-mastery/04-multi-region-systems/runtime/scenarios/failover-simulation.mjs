import { RegionRegistry } from "../../dist/control-plane/region-registry.js";
import { RegionRouter } from "../../dist/control-plane/region-router.js";

const registry = new RegionRegistry([
  { region: "ap-south-1", healthy: false },
  { region: "ap-southeast-1", healthy: true },
  { region: "eu-west-1", healthy: true },
]);

const router = new RegionRouter(registry);

const routedRegion = router.route({
  tenantId: "tenant-in",
  primaryRegion: "ap-south-1",
  allowedFailoverRegions: ["ap-southeast-1", "eu-west-1"],
  residency: "apac",
});

console.log(
  JSON.stringify({
    scenario: "failover-simulation",
    routedRegion,
    failoverTriggered: routedRegion !== "ap-south-1",
  }),
);
