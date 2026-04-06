import { createDefaultContentDraft } from "../../dist/communication/content-draft.js";
import { reviewForPublication } from "../../dist/communication/publication-gate.js";

const draft = createDefaultContentDraft();
const review = reviewForPublication(draft);

console.log(
  JSON.stringify({
    scenario: "content-review",
    title: draft.title,
    audience: draft.audience,
    approved: review.approved,
  }),
);
