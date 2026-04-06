import { validateRetryOwnership } from "./mesh/retry-policy.js";

console.log(
  validateRetryOwnership({
    meshRetriesEnabled: true,
    applicationRetriesEnabled: false,
  }),
);
