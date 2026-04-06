import { reviewRfc } from "./rfc/review-gate.js";
import { createDefaultRfcDocument } from "./rfc/rfc-document.js";

console.log(reviewRfc(createDefaultRfcDocument()));
