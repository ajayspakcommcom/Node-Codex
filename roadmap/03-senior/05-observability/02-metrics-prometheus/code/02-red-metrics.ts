import { MetricsRegistry } from "./shared/metrics-registry";

const registry = new MetricsRegistry();

registry.counter("http_requests_total", "Request rate").inc({
  route: "/orders",
  method: "GET",
  statusClass: "5xx",
});

registry.histogram("http_request_duration_ms", "Request latency").observe(
  { route: "/orders", method: "GET" },
  920,
);

registry.counter("http_request_errors_total", "Request errors").inc({
  route: "/orders",
  errorType: "dependency_timeout",
});

console.log(registry.render());
