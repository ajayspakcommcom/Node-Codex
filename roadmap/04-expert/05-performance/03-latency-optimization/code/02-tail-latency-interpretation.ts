import { summarizeLatencyProfile } from "./latency/latency-profile.js";

console.log(
  summarizeLatencyProfile({
    p50Ms: 45,
    p95Ms: 180,
    p99Ms: 420,
  }),
);
