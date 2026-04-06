import { createDefaultGuardrailPolicy } from "./finops/guardrail-policy.js";

const policy = createDefaultGuardrailPolicy();

console.log(
  policy.review({
    serviceName: "analytics-batch",
    idleNodeCount: 6,
    hasStorageLifecyclePolicy: false,
  }),
);
