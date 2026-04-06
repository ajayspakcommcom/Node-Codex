import { MetricsRegistry } from "./shared/metrics-registry";

const registry = new MetricsRegistry();

registry.counter("safe_label_example_total", "Uses bounded labels").inc({
  route: "/users/:id",
  method: "GET",
  statusClass: "2xx",
});

console.log(
  JSON.stringify({
    good: "bounded labels like route template and status class",
    bad: "userId, requestId, or raw URL path as labels",
    output: registry.render(),
  }),
);
