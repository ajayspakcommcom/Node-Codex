import { classifyReleaseImpact } from "./library/semver-policy.js";

console.log(
  classifyReleaseImpact({
    apiRemoved: false,
    apiAdded: true,
    bugFixOnly: false,
  }),
);
