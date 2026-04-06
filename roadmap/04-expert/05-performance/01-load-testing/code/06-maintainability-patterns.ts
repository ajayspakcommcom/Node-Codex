export const maintainabilityPatterns = [
  "Version traffic profiles and success thresholds with the service.",
  "Review percentile latency and error rate together, not average latency alone.",
  "Separate short burst, ramp, and soak scenarios instead of overloading one test.",
  "Tie release gates to SLO-oriented thresholds before the run starts.",
] as const;
