import { createDefaultAuthorizationPolicy } from "./zero-trust/authorization-policy.js";

const policy = createDefaultAuthorizationPolicy();

console.log(
  policy.isAllowed({
    principal: "orders-service",
    resource: "payments.capture",
  }),
);
