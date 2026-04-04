interface ConcurrencyDecision {
  readonly workload: string;
  readonly recommendedTool: "cluster" | "worker_threads" | "neither";
  readonly reason: string;
}

const decisions: readonly ConcurrencyDecision[] = [
  {
    workload: "HTTP API serving traffic across CPU cores",
    recommendedTool: "cluster",
    reason: "Request-serving processes can scale across cores with process isolation.",
  },
  {
    workload: "Generating a CPU-heavy PDF report",
    recommendedTool: "worker_threads",
    reason: "Offload compute while keeping the main event loop responsive.",
  },
  {
    workload: "Simple database reads",
    recommendedTool: "neither",
    reason: "This work is usually I/O-bound and does not justify concurrency complexity.",
  },
];

for (const decision of decisions) {
  console.log(decision);
}
