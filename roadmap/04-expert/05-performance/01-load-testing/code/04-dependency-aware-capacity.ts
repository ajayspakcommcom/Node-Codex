import { assessDependencyPressure } from "./load-test/dependency-pressure.js";

console.log(
  assessDependencyPressure({
    dependencyName: "payments-db",
    p95LatencyMs: 95,
    errorRatePercent: 0.8,
  }),
);
