import { createDefaultAuthorizationPolicy } from "../../dist/mesh/authorization-policy.js";
import { createWeightedTrafficRouter } from "../../dist/mesh/traffic-router.js";
import { validateRetryOwnership } from "../../dist/mesh/retry-policy.js";
import { createRolloutPlanner } from "../../dist/mesh/rollout-planner.js";

const policy = createDefaultAuthorizationPolicy();
const router = createWeightedTrafficRouter({
  stableWeightPercent: 90,
  candidateWeightPercent: 10,
});

validateRetryOwnership({
  meshRetriesEnabled: true,
  applicationRetriesEnabled: false,
});

const planner = createRolloutPlanner();

console.log(
  JSON.stringify({
    scenario: "service-mesh-rollout",
    gatewayToPaymentsAllowed: policy.isAllowed({
      sourceService: "api-gateway",
      destinationService: "payments-service",
    }),
    trafficPlan: router.plan(),
    rolloutSteps: planner.stepsFor("checkout-service"),
  }),
);
