import { bootstrapService } from "./framework/service-bootstrapper.js";

console.log(
  bootstrapService({
    frameworkVersion: "2.3.0",
    serviceName: "inventory-worker",
    ownerTeam: "inventory-platform",
    exposure: "internal",
    extensions: ["reconciliation-job"],
  }).extensions,
);
