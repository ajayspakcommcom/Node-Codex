import { reviewContribution } from "./library/contribution-review.js";

console.log(
  reviewContribution({
    testsIncluded: true,
    compatibilityReviewed: true,
    supportScopeClear: true,
  }),
);
