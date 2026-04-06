import { classifyReleaseImpact } from "../../dist/library/semver-policy.js";
import { evaluateReleaseGate } from "../../dist/library/release-gate.js";
import { createDefaultDeprecationRegistry } from "../../dist/library/deprecation-registry.js";

const releaseType = classifyReleaseImpact({
  apiRemoved: false,
  apiAdded: true,
  bugFixOnly: false,
});
const gate = evaluateReleaseGate({
  releaseType,
  hasChangelog: true,
  hasMigrationGuide: true,
  testsPassing: true,
});
const deprecations = createDefaultDeprecationRegistry().active();

console.log(
  JSON.stringify({
    scenario: "library-release-review",
    releaseType,
    approved: gate.approved,
    activeDeprecations: deprecations.length,
  }),
);
