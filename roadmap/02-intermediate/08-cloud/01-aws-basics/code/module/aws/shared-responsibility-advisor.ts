import type { ResponsibilityBoundary } from "../../shared/aws-types.js";

export class SharedResponsibilityAdvisor {
  public summarize(boundary: ResponsibilityBoundary): {
    readonly awsManaged: readonly string[];
    readonly teamOwned: readonly string[];
    readonly recommendation: string;
  } {
    return {
      awsManaged: boundary.awsManaged,
      teamOwned: boundary.teamOwned,
      recommendation:
        "Managed services reduce infrastructure burden, but application teams still own security, configuration, and data handling decisions.",
    };
  }
}
