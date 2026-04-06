import { MetricsRegistry } from "./shared/metrics-registry";

const registry = new MetricsRegistry();

registry.counter("http_requests_total", "Total HTTP requests").inc({
  route: "/payments",
  method: "POST",
  statusClass: "2xx",
});

registry.gauge("queue_depth", "Current queue depth").set(
  { queue: "invoice-generation" },
  32,
);

registry.histogram("http_request_duration_ms", "Request duration in milliseconds").observe(
  { route: "/payments", method: "POST" },
  184,
);

console.log(registry.render());
