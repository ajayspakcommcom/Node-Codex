import { bootstrapService } from "../../dist/framework/service-bootstrapper.js";
import { evaluateFrameworkReleaseGate } from "../../dist/framework/release-gate.js";

const service = bootstrapService({
  frameworkVersion: "2.3.0",
  serviceName: "orders-api",
  ownerTeam: "commerce-platform",
  exposure: "public",
  extensions: ["orders-routes", "checkout-policy"],
});

const releaseGate = evaluateFrameworkReleaseGate({
  hasChangelog: true,
  hasMigrationGuide: true,
  compatibilityTestsPassing: true,
  adoptingServiceValidationPassing: true,
});

console.log(
  JSON.stringify({
    scenario: "framework-adoption",
    serviceName: service.serviceName,
    mandatoryPlugins: service.mandatoryPlugins.length,
    releaseApproved: releaseGate.approved,
  }),
);
