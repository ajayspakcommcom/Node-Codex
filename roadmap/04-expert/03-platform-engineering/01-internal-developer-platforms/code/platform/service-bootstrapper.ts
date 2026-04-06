import { ExceptionRegistry, createDefaultExceptionRegistry } from "./exception-registry.js";
import { PlatformPolicies, createDefaultPlatformPolicies } from "./platform-policies.js";
import {
  ServiceTemplateCatalog,
  createDefaultTemplateCatalog,
  type DataClassification,
  type Exposure,
  type ServiceType,
} from "./service-template-catalog.js";

export interface ServiceProvisionRequest {
  serviceName: string;
  teamName: string;
  serviceType: ServiceType;
  exposure: Exposure;
  dataClassification: DataClassification;
  requestedExceptions: readonly string[];
}

export interface ProvisionedServicePlan {
  serviceName: string;
  teamName: string;
  templateId: string;
  templateVersion: number;
  packages: readonly string[];
  enforcedControls: readonly string[];
  grantedExceptions: readonly string[];
}

export interface UpgradePlanRequest {
  currentTemplateId: string;
  currentTemplateVersion: number;
  targetTemplateVersion: number;
}

export interface TemplateUpgradePlan {
  templateId: string;
  fromVersion: number;
  toVersion: number;
  addedPackages: readonly string[];
  addedControls: readonly string[];
}

export class PlatformBootstrapper {
  public constructor(
    private readonly catalog: ServiceTemplateCatalog,
    private readonly policies: PlatformPolicies,
    private readonly exceptions: ExceptionRegistry,
  ) {}

  public provision(request: ServiceProvisionRequest): ProvisionedServicePlan {
    const template = this.catalog.findLatestFor(request.serviceType);
    const requiredControls = this.policies.requiredControlsFor({
      serviceType: request.serviceType,
      exposure: request.exposure,
      dataClassification: request.dataClassification,
    });

    const grantedExceptions = request.requestedExceptions.filter((controlId) => {
      return this.exceptions.findActiveApproval({
        serviceName: request.serviceName,
        controlId,
      });
    });

    const rejectedExceptions = request.requestedExceptions.filter(
      (controlId) => !grantedExceptions.includes(controlId),
    );

    if (rejectedExceptions.length > 0) {
      throw new Error(`Unapproved platform exceptions: ${rejectedExceptions.join(", ")}`);
    }

    const enforcedControls = requiredControls.filter(
      (controlId) => !grantedExceptions.includes(controlId),
    );

    return {
      serviceName: request.serviceName,
      teamName: request.teamName,
      templateId: template.templateId,
      templateVersion: template.version,
      packages: template.defaultPackages,
      enforcedControls,
      grantedExceptions,
    };
  }

  public planUpgrade(request: UpgradePlanRequest): TemplateUpgradePlan {
    const currentTemplate = this.catalog.findVersion(request.currentTemplateId, request.currentTemplateVersion);
    const targetTemplate = this.catalog.findVersion(request.currentTemplateId, request.targetTemplateVersion);

    return {
      templateId: request.currentTemplateId,
      fromVersion: currentTemplate.version,
      toVersion: targetTemplate.version,
      addedPackages: targetTemplate.defaultPackages.filter(
        (pkg) => !currentTemplate.defaultPackages.includes(pkg),
      ),
      addedControls: targetTemplate.defaultControls.filter(
        (control) => !currentTemplate.defaultControls.includes(control),
      ),
    };
  }
}

export function createPlatformBootstrapper(): PlatformBootstrapper {
  return new PlatformBootstrapper(
    createDefaultTemplateCatalog(),
    createDefaultPlatformPolicies(),
    createDefaultExceptionRegistry(),
  );
}
