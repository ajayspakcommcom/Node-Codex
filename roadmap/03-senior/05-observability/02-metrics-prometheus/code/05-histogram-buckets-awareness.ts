console.log(
  JSON.stringify({
    metric: "http_request_duration_ms",
    buckets: [25, 50, 100, 250, 500, 1000, 2000],
    note: "Buckets should reflect service latency expectations and alerting needs.",
  }),
);
