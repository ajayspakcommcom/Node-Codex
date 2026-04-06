import { createDefaultControlRegistry } from "../../dist/compliance/control-registry.js";
import { createEvidenceRecorder } from "../../dist/compliance/evidence-recorder.js";
import { createRetentionPolicy } from "../../dist/compliance/retention-policy.js";
import { validateDeletionRequest } from "../../dist/compliance/deletion-workflow.js";

const control = createDefaultControlRegistry().find("gdpr-deletion-request");
const evidence = createEvidenceRecorder().record({
  controlId: "soc2-access-review",
  source: "identity-audit-job",
});
const retentionDays = createRetentionPolicy().daysFor("customer-profile");

validateDeletionRequest({
  dataSet: "customer-profile",
  classification: "personal-data",
  hasVerifiedRequester: true,
  hasLinkedLegalHold: false,
});

console.log(
  JSON.stringify({
    scenario: "compliance-review",
    controlOwner: control.owner,
    evidenceStatus: evidence.status,
    retentionDays,
  }),
);
