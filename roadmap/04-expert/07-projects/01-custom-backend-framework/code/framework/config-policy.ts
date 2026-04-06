import type { ServiceBootstrapRequest } from "./framework-types.js";

export function validateServiceBootstrapRequest(request: ServiceBootstrapRequest): true {
  if (!request.serviceName.trim()) {
    throw new Error("serviceName is required");
  }

  if (!request.ownerTeam.trim()) {
    throw new Error("ownerTeam is required");
  }

  if (!request.frameworkVersion.trim()) {
    throw new Error("frameworkVersion is required");
  }

  return true;
}
