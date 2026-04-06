export type ServiceType = "http-api" | "worker";
export type Exposure = "public" | "internal";
export type DataClassification = "internal" | "regulated";

export interface ServiceTemplate {
  templateId: string;
  version: number;
  serviceType: ServiceType;
  defaultPackages: readonly string[];
  defaultControls: readonly string[];
}

export class ServiceTemplateCatalog {
  public constructor(private readonly templates: readonly ServiceTemplate[]) {}

  public list(): readonly ServiceTemplate[] {
    return this.templates;
  }

  public findLatestFor(serviceType: ServiceType): ServiceTemplate {
    const match = this.templates
      .filter((template) => template.serviceType === serviceType)
      .sort((left, right) => right.version - left.version)[0];

    if (!match) {
      throw new Error(`No template found for service type ${serviceType}`);
    }

    return match;
  }

  public findVersion(templateId: string, version: number): ServiceTemplate {
    const match = this.templates.find(
      (template) => template.templateId === templateId && template.version === version,
    );

    if (!match) {
      throw new Error(`Template ${templateId}@${version} was not found`);
    }

    return match;
  }
}

export function createDefaultTemplateCatalog(): ServiceTemplateCatalog {
  return new ServiceTemplateCatalog([
    {
      templateId: "node-http-service",
      version: 1,
      serviceType: "http-api",
      defaultPackages: ["framework-core", "observability", "platform-health"],
      defaultControls: ["default-tracing", "standard-secrets", "graceful-shutdown"],
    },
    {
      templateId: "node-http-service",
      version: 2,
      serviceType: "http-api",
      defaultPackages: ["framework-core", "observability", "platform-health", "runtime-policy"],
      defaultControls: ["default-tracing", "standard-secrets", "graceful-shutdown", "rollout-probes"],
    },
    {
      templateId: "node-worker-service",
      version: 1,
      serviceType: "worker",
      defaultPackages: ["framework-core", "observability", "job-runtime"],
      defaultControls: ["default-tracing", "standard-secrets", "drain-aware-shutdown"],
    },
  ]);
}
