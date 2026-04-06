import { createDefaultContentDraft } from "./communication/content-draft.js";
import { reviewForPublication } from "./communication/publication-gate.js";

console.log(reviewForPublication(createDefaultContentDraft()));
