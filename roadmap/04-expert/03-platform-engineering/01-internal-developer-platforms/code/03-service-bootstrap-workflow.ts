import { createPlatformBootstrapper } from "./platform/service-bootstrapper.js";

const bootstrapper = createPlatformBootstrapper();

console.log(
  bootstrapper.provision({
    serviceName: "catalog-api",
    teamName: "commerce",
    serviceType: "http-api",
    exposure: "public",
    dataClassification: "internal",
    requestedExceptions: [],
  }),
);
