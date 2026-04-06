import { createDefaultThreatModel } from "../../dist/threat-model/threat-model.js";

const model = createDefaultThreatModel();

console.log(
  JSON.stringify({
    scenario: "threat-review",
    assetCount: model.assets().length,
    boundaryCount: model.boundaries().length,
    highRiskMitigations: model.highRiskMitigations(),
  }),
);
