import { MetricsRegistry } from "./shared/metrics-registry";

const registry = new MetricsRegistry();

registry.gauge("queue_depth", "Queue depth").set({ queue: "email-delivery" }, 120);
registry.counter("job_failures_total", "Background job failures").inc({
  queue: "email-delivery",
  reason: "provider_timeout",
});
registry.histogram("job_processing_duration_ms", "Job processing duration").observe(
  { queue: "email-delivery" },
  480,
);

console.log(registry.render());
