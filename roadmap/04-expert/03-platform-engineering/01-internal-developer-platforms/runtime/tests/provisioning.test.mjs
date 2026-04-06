import test from "node:test";
import assert from "node:assert/strict";

import { createPlatformBootstrapper } from "../../dist/platform/service-bootstrapper.js";

test("public regulated api receives platform mandatory controls", () => {
  const bootstrapper = createPlatformBootstrapper();

  const plan = bootstrapper.provision({
    serviceName: "payments-api",
    teamName: "payments",
    serviceType: "http-api",
    exposure: "public",
    dataClassification: "regulated",
    requestedExceptions: [],
  });

  assert.equal(plan.templateVersion, 2);
  assert.ok(plan.enforcedControls.includes("auth-gateway"));
  assert.ok(plan.enforcedControls.includes("audit-logging"));
  assert.ok(plan.enforcedControls.includes("rollout-probes"));
});

test("unapproved exception request is rejected", () => {
  const bootstrapper = createPlatformBootstrapper();

  assert.throws(
    () =>
      bootstrapper.provision({
        serviceName: "payments-api",
        teamName: "payments",
        serviceType: "http-api",
        exposure: "public",
        dataClassification: "internal",
        requestedExceptions: ["default-tracing"],
      }),
    /Unapproved platform exceptions/,
  );
});

test("approved exception is accepted and removed from enforced controls", () => {
  const bootstrapper = createPlatformBootstrapper();

  const plan = bootstrapper.provision({
    serviceName: "reporting-worker",
    teamName: "analytics",
    serviceType: "worker",
    exposure: "internal",
    dataClassification: "internal",
    requestedExceptions: ["default-tracing"],
  });

  assert.deepEqual(plan.grantedExceptions, ["default-tracing"]);
  assert.equal(plan.enforcedControls.includes("default-tracing"), false);
});
