import test from "node:test";
import assert from "node:assert/strict";
import { RegionRegistry } from "../../dist/control-plane/region-registry.js";
import { RegionRouter } from "../../dist/control-plane/region-router.js";

test("router prefers healthy primary region", () => {
  const router = new RegionRouter(
    new RegionRegistry([
      { region: "ap-south-1", healthy: true },
      { region: "eu-west-1", healthy: true },
    ]),
  );

  const routedRegion = router.route({
    tenantId: "tenant-in",
    primaryRegion: "ap-south-1",
    allowedFailoverRegions: ["eu-west-1"],
    residency: "apac",
  });

  assert.equal(routedRegion, "ap-south-1");
});

test("router fails over when primary region is unhealthy and failover region is allowed", () => {
  const router = new RegionRouter(
    new RegionRegistry([
      { region: "ap-south-1", healthy: false },
      { region: "ap-southeast-1", healthy: true },
    ]),
  );

  const routedRegion = router.route({
    tenantId: "tenant-in",
    primaryRegion: "ap-south-1",
    allowedFailoverRegions: ["ap-southeast-1"],
    residency: "apac",
  });

  assert.equal(routedRegion, "ap-southeast-1");
});
