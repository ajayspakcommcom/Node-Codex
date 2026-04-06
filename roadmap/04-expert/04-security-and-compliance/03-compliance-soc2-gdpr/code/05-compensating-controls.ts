import { reviewCompensatingControl } from "./compliance/compensating-control-review.js";

console.log(
  reviewCompensatingControl({
    primaryControlAvailable: false,
    compensatingControlDocumented: true,
    nextReviewOn: "2026-08-01",
  }),
);
