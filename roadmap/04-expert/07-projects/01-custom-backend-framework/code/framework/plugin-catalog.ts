import type { ServiceExposure } from "./framework-types.js";

export function requiredPluginsForExposure(exposure: ServiceExposure): readonly string[] {
  const basePlugins = ["health-checks", "structured-logging", "tracing", "graceful-shutdown"];

  if (exposure === "public") {
    return [...basePlugins, "auth-boundary", "rate-limit-policy", "request-id"];
  }

  return [...basePlugins, "service-authz"];
}
