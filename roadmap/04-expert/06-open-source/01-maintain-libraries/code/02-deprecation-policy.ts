import { createDefaultDeprecationRegistry } from "./library/deprecation-registry.js";

const registry = createDefaultDeprecationRegistry();

console.log(registry.active());
