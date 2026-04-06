import { createEvidenceRecorder } from "./compliance/evidence-recorder.js";

const recorder = createEvidenceRecorder();

console.log(
  recorder.record({
    controlId: "soc2-access-review",
    source: "identity-audit-job",
  }),
);
