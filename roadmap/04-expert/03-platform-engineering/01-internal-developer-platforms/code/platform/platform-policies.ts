import type { DataClassification, Exposure, ServiceType } from "./service-template-catalog.js";

export interface ServiceProfile {
  serviceType: ServiceType;
  exposure: Exposure;
  dataClassification: DataClassification;
}

export class PlatformPolicies {
  public requiredControlsFor(profile: ServiceProfile): readonly string[] {
    const controls = new Set<string>(["default-tracing", "standard-secrets"]);

    if (profile.serviceType === "http-api") {
      controls.add("graceful-shutdown");
      controls.add("rollout-probes");
    } else {
      controls.add("drain-aware-shutdown");
    }

    if (profile.exposure === "public") {
      controls.add("auth-gateway");
      controls.add("rate-limits");
    }

    if (profile.dataClassification === "regulated") {
      controls.add("audit-logging");
      controls.add("regulated-data-tagging");
    }

    return [...controls].sort();
  }
}

export function createDefaultPlatformPolicies(): PlatformPolicies {
  return new PlatformPolicies();
}
