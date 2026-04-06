import { reviewConfidentiality } from "./communication/confidentiality-check.js";

console.log(
  reviewConfidentiality({
    containsCustomerNames: false,
    containsInternalSystemNames: true,
    hasBeenGeneralized: true,
  }),
);
