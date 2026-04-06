import { bootstrapService } from "./framework/service-bootstrapper.js";

console.log(
  bootstrapService({
    frameworkVersion: "2.3.0",
    serviceName: "orders-api",
    ownerTeam: "commerce-platform",
    exposure: "public",
    extensions: ["orders-routes", "checkout-policy"],
  }),
);
