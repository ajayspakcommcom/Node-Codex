import { createWeightedTrafficRouter } from "./mesh/traffic-router.js";

const router = createWeightedTrafficRouter({
  stableWeightPercent: 90,
  candidateWeightPercent: 10,
});

console.log(router.plan());
