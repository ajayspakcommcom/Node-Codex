console.log(
  JSON.stringify({
    alertName: "queue_depth_too_high",
    metric: "queue_depth",
    threshold: 10000,
    duration: "10m",
    owner: "async-platform",
  }),
);
