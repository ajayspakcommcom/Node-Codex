import { validateCredentialPolicy } from "./zero-trust/credential-policy.js";

console.log(
  validateCredentialPolicy({
    ttlMinutes: 30,
    maximumTtlMinutes: 60,
  }),
);
