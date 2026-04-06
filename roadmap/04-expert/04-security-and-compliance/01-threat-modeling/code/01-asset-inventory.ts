import { createDefaultThreatModel } from "./threat-model/threat-model.js";

const model = createDefaultThreatModel();

console.log(model.assets());
