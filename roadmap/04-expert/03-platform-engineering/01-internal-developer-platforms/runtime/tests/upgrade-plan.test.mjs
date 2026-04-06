import test from "node:test";
import assert from "node:assert/strict";

import { createPlatformBootstrapper } from "../../dist/platform/service-bootstrapper.js";

test("upgrade plan highlights newly added packages and controls", () => {
  const bootstrapper = createPlatformBootstrapper();

  const plan = bootstrapper.planUpgrade({
    currentTemplateId: "node-http-service",
    currentTemplateVersion: 1,
    targetTemplateVersion: 2,
  });

  assert.deepEqual(plan.addedPackages, ["runtime-policy"]);
  assert.deepEqual(plan.addedControls, ["rollout-probes"]);
});
