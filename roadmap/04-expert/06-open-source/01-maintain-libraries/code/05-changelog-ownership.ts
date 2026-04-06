import { buildReleaseSummary } from "./library/release-summary.js";

console.log(
  buildReleaseSummary({
    version: "2.4.0",
    releaseType: "minor",
    changelogEntries: 3,
  }),
);
