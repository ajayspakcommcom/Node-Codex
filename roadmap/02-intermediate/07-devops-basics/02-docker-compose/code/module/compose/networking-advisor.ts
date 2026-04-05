import type { ComposeSpec } from "../../shared/compose-types.js";

export class NetworkingAdvisor {
  public summarize(spec: ComposeSpec): {
    readonly explicitNetworks: readonly string[];
    readonly offNetworkServices: readonly string[];
  } {
    const explicitNetworks = spec.networks ?? [];
    const offNetworkServices = spec.services
      .filter((service) => (service.networks?.length ?? 0) === 0)
      .map((service) => service.name);

    return {
      explicitNetworks,
      offNetworkServices,
    };
  }
}
