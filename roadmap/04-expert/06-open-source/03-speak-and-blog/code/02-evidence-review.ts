import { validateEvidenceQuality } from "./communication/evidence-review.js";

console.log(
  validateEvidenceQuality({
    hasMetrics: true,
    hasConcreteExample: true,
    hasOperationalLesson: true,
  }),
);
