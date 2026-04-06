import { reviewFrameworkUpgrade } from "./framework/upgrade-policy.js";

console.log(
  reviewFrameworkUpgrade({
    currentVersion: "2.2.0",
    targetVersion: "2.3.0",
    hasMigrationGuide: true,
    compatibilityTestsPassing: true,
  }),
);
