import { createDefaultTemplateCatalog } from "./platform/service-template-catalog.js";

const catalog = createDefaultTemplateCatalog();

console.log(
  catalog.list().map((template) => ({
    templateId: template.templateId,
    version: template.version,
    serviceType: template.serviceType,
  })),
);
