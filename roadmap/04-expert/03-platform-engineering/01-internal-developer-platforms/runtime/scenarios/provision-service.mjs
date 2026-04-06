import { createPlatformBootstrapper } from "../../dist/platform/service-bootstrapper.js";
import { calculateAdoptionRate } from "../../dist/platform/adoption-metrics.js";

const bootstrapper = createPlatformBootstrapper();

const plan = bootstrapper.provision({
  serviceName: "checkout-api",
  teamName: "commerce",
  serviceType: "http-api",
  exposure: "public",
  dataClassification: "regulated",
  requestedExceptions: [],
});

const adoptionRate = calculateAdoptionRate({
  totalServices: 42,
  pavedRoadServices: 37,
});

console.log(
  JSON.stringify({
    scenario: "internal-platform-provisioning",
    serviceName: plan.serviceName,
    templateVersion: plan.templateVersion,
    enforcedControls: plan.enforcedControls,
    adoptionRate,
  }),
);
