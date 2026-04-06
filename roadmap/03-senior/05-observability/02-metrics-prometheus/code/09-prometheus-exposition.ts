import { MetricsRegistry } from "./shared/metrics-registry";

const registry = new MetricsRegistry();

registry.counter("process_restarts_total", "Process restart count").inc({ service: "catalog-api" });

console.log(registry.render());
