import { recommendOptimization } from "./latency/optimization-recommender.js";

console.log(
  recommendOptimization({
    bottleneckType: "dependency",
    tailLatencyDominant: true,
  }),
);
