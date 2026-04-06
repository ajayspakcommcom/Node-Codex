import { createDefaultAttributionRegistry } from "../../dist/finops/attribution-registry.js";
import { createDefaultBudgetPolicy } from "../../dist/finops/budget-policy.js";
import { detectCostAnomaly } from "../../dist/finops/anomaly-detector.js";
import { createDefaultGuardrailPolicy } from "../../dist/finops/guardrail-policy.js";

const owner = createDefaultAttributionRegistry().findOwner("catalog-api");
const budgetReview = createDefaultBudgetPolicy().evaluate({
  serviceName: "catalog-api",
  monthlyCostUsd: 8200,
});
const anomalyReview = detectCostAnomaly({
  previousMonthlyCostUsd: 7000,
  currentMonthlyCostUsd: 8200,
  thresholdIncreasePercent: 10,
});
const guardrailReview = createDefaultGuardrailPolicy().review({
  serviceName: "catalog-api",
  idleNodeCount: 3,
  hasStorageLifecyclePolicy: true,
});

console.log(
  JSON.stringify({
    scenario: "finops-cost-review",
    owner: owner.owningTeam,
    withinBudget: budgetReview.withinBudget,
    anomalyDetected: anomalyReview.anomalyDetected,
    recommendations: guardrailReview.recommendations,
  }),
);
