import { calculateUnitCost } from "./finops/unit-economics.js";

console.log(
  calculateUnitCost({
    monthlyCostUsd: 12400,
    monthlyRequestCount: 6200000,
  }),
);
