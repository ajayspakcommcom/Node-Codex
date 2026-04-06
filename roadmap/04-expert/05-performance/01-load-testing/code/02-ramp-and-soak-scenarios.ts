import { createScenarioCatalog } from "./load-test/scenario-catalog.js";

const catalog = createScenarioCatalog();

console.log(catalog.list());
