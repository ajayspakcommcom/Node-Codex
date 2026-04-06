import { scoreThreat } from "./threat-model/risk-scoring.js";

console.log(
  scoreThreat({
    impact: "high",
    likelihood: "medium",
  }),
);
