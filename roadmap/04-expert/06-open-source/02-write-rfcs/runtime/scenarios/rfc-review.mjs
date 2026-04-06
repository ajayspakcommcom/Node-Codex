import { createDefaultRfcDocument } from "../../dist/rfc/rfc-document.js";
import { reviewRfc } from "../../dist/rfc/review-gate.js";
import { createDefaultRfcStatus } from "../../dist/rfc/status-tracker.js";

const document = createDefaultRfcDocument();
const review = reviewRfc(document);
const status = createDefaultRfcStatus();

console.log(
  JSON.stringify({
    scenario: "rfc-review",
    title: document.title,
    approved: review.approved,
    state: status.state,
    implementationLinked: status.implementationLinked,
  }),
);
