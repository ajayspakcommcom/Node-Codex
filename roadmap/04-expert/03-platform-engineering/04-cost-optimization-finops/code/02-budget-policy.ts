import { createDefaultBudgetPolicy } from "./finops/budget-policy.js";

const policy = createDefaultBudgetPolicy();

console.log(policy.evaluate({ serviceName: "catalog-api", monthlyCostUsd: 8200 }));
