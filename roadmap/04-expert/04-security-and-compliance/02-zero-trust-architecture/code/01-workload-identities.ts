import { createDefaultIdentityRegistry } from "./zero-trust/identity-registry.js";

const registry = createDefaultIdentityRegistry();

console.log(registry.find("payments-service"));
