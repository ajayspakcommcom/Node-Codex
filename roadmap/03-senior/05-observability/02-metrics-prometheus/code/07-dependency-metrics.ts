import { MetricsRegistry } from "./shared/metrics-registry";

const registry = new MetricsRegistry();

registry.counter("dependency_requests_total", "Dependency requests").inc({
  dependency: "payment-gateway",
  outcome: "success",
});

registry.histogram("dependency_latency_ms", "Dependency latency").observe(
  { dependency: "payment-gateway" },
  310,
);

console.log(registry.render());
