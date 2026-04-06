import { validateDeletionRequest } from "./compliance/deletion-workflow.js";

console.log(
  validateDeletionRequest({
    dataSet: "customer-profile",
    classification: "personal-data",
    hasVerifiedRequester: true,
    hasLinkedLegalHold: false,
  }),
);
