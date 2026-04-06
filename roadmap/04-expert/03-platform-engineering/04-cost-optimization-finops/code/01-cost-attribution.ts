import { createDefaultAttributionRegistry } from "./finops/attribution-registry.js";

const registry = createDefaultAttributionRegistry();

console.log(registry.findOwner("catalog-api"));
