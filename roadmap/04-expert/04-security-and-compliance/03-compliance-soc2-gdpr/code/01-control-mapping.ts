import { createDefaultControlRegistry } from "./compliance/control-registry.js";

const registry = createDefaultControlRegistry();

console.log(registry.find("soc2-access-review"));
