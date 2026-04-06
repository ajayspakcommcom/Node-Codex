import { MetricsRegistry } from "./shared/metrics-registry";

const registry = new MetricsRegistry();

registry.counter("checkout_completed_total", "Completed checkouts").inc({
  salesChannel: "web",
});

registry.counter("http_requests_total", "HTTP requests").inc({
  route: "/checkout",
  method: "POST",
  statusClass: "2xx",
});

console.log(registry.render());
