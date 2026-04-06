import { createRolloutPlanner } from "./mesh/rollout-planner.js";

const planner = createRolloutPlanner();

console.log(planner.stepsFor("checkout-service"));
