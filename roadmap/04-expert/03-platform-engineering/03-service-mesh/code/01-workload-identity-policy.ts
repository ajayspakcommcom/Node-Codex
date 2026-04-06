import { createDefaultAuthorizationPolicy } from "./mesh/authorization-policy.js";

const policy = createDefaultAuthorizationPolicy();

console.log(
  policy.isAllowed({
    sourceService: "api-gateway",
    destinationService: "payments-service",
  }),
);
