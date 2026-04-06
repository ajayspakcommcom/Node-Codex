import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultTemplateCatalog } from "../../dist/platform/service-template-catalog.js";

test("latest template is returned for a service type", () => {
  const catalog = createDefaultTemplateCatalog();
  const template = catalog.findLatestFor("http-api");

  assert.equal(template.templateId, "node-http-service");
  assert.equal(template.version, 2);
});

test("specific template version can be resolved", () => {
  const catalog = createDefaultTemplateCatalog();
  const template = catalog.findVersion("node-worker-service", 1);

  assert.equal(template.serviceType, "worker");
});
