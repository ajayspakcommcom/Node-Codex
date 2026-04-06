export type ServiceExposure = "public" | "internal";

export interface ServiceBootstrapRequest {
  frameworkVersion: string;
  serviceName: string;
  ownerTeam: string;
  exposure: ServiceExposure;
  extensions: readonly string[];
}

export interface BootstrappedService {
  frameworkVersion: string;
  serviceName: string;
  ownerTeam: string;
  exposure: ServiceExposure;
  mandatoryPlugins: readonly string[];
  extensions: readonly string[];
}
