import { validateServiceBootstrapRequest } from "./config-policy.js";
import type { BootstrappedService, ServiceBootstrapRequest } from "./framework-types.js";
import { requiredPluginsForExposure } from "./plugin-catalog.js";

export function bootstrapService(request: ServiceBootstrapRequest): BootstrappedService {
  validateServiceBootstrapRequest(request);

  return {
    frameworkVersion: request.frameworkVersion,
    serviceName: request.serviceName,
    ownerTeam: request.ownerTeam,
    exposure: request.exposure,
    mandatoryPlugins: requiredPluginsForExposure(request.exposure),
    extensions: request.extensions,
  };
}
