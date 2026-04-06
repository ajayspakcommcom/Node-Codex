import { createPlatformBootstrapper } from "./platform/service-bootstrapper.js";

const bootstrapper = createPlatformBootstrapper();

console.log(
  bootstrapper.planUpgrade({
    currentTemplateId: "node-http-service",
    currentTemplateVersion: 1,
    targetTemplateVersion: 2,
  }),
);
