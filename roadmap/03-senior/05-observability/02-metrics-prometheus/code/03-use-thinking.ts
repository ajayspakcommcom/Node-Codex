import { MetricsRegistry } from "./shared/metrics-registry";

const registry = new MetricsRegistry();

registry.gauge("nodejs_event_loop_utilization_ratio", "Event loop utilization").set({}, 0.72);
registry.gauge("db_connection_pool_usage_ratio", "Database pool utilization").set(
  { pool: "primary" },
  0.85,
);
registry.counter("worker_saturation_events_total", "Times worker pool hit saturation").inc({
  workerPool: "image-processing",
});

console.log(registry.render());
