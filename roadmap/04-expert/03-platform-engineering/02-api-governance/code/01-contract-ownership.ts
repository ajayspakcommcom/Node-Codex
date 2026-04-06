import { createDefaultOwnershipRegistry } from "./governance/ownership-registry.js";

const registry = createDefaultOwnershipRegistry();

console.log(registry.findOwner("public.catalog.products"));
