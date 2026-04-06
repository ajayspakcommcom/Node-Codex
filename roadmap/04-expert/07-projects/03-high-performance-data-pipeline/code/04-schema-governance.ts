import { reviewSchemaEvolution } from "./pipeline/schema-governance.js";

const review = reviewSchemaEvolution({
  currentVersion: 4,
  proposedVersion: 5,
  backwardCompatible: true,
  replayCompatible: true,
});

console.log(review);
