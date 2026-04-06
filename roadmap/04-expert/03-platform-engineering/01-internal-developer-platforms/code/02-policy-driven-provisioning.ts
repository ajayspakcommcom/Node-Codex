import { createDefaultPlatformPolicies } from "./platform/platform-policies.js";

const policies = createDefaultPlatformPolicies();

console.log(
  policies.requiredControlsFor({
    exposure: "public",
    dataClassification: "regulated",
    serviceType: "http-api",
  }),
);
