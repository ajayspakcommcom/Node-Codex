import { createDefaultExceptionRegistry } from "./platform/exception-registry.js";

const registry = createDefaultExceptionRegistry();

console.log(
  registry.findActiveApproval({
    serviceName: "reporting-worker",
    controlId: "default-tracing",
  }),
);
