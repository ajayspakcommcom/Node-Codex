import { evaluateDeliveryOutcome } from "./pipeline/delivery-policy.js";

const outcome = evaluateDeliveryOutcome({
  attempts: 3,
  maxAttempts: 5,
  errorCategory: "transient",
});

console.log(outcome);
