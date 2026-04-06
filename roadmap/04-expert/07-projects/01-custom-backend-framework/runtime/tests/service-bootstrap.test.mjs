import test from "node:test";
import assert from "node:assert/strict";

import { bootstrapService } from "../../dist/framework/service-bootstrapper.js";

test("public service receives mandatory public-facing platform plugins", () => {
  const service = bootstrapService({
    frameworkVersion: "2.3.0",
    serviceName: "orders-api",
    ownerTeam: "commerce-platform",
    exposure: "public",
    extensions: ["orders-routes"],
  });

  assert.ok(service.mandatoryPlugins.includes("auth-boundary"));
  assert.ok(service.mandatoryPlugins.includes("rate-limit-policy"));
});

test("internal service still receives mandatory internal platform plugins", () => {
  const service = bootstrapService({
    frameworkVersion: "2.3.0",
    serviceName: "inventory-worker",
    ownerTeam: "inventory-platform",
    exposure: "internal",
    extensions: ["reconciliation-job"],
  });

  assert.ok(service.mandatoryPlugins.includes("service-authz"));
});
