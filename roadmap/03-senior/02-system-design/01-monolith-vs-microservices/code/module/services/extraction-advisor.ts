import {
  ArchitectureStyle,
  DomainModule,
  ServiceBoundaryCandidate,
} from "../../shared/architecture-types.js";

export class ExtractionAdvisor {
  public recommendArchitecture(
    modules: DomainModule[],
    candidates: ServiceBoundaryCandidate[],
  ): {
    recommendedArchitecture: ArchitectureStyle;
    reasons: string[];
  } {
    const reasons: string[] = [];

    const highPressureModules = modules.filter(
      (module) =>
        module.independentReleasePressure === "high" &&
        module.scalingNeed === "separate",
    );

    const highCouplingCandidates = candidates.filter(
      (candidate) =>
        candidate.synchronousDependencies.length > 1 &&
        candidate.sharedDataTouches.length > 2,
    );

    if (highPressureModules.length >= 2) {
      reasons.push("Multiple domains want independent release and scaling behavior.");
    }

    if (highCouplingCandidates.length > 0) {
      reasons.push("Some candidate boundaries would create expensive synchronous coordination.");
    }

    if (highPressureModules.length >= 2 && highCouplingCandidates.length === 0) {
      return {
        recommendedArchitecture: "microservices",
        reasons: [
          ...reasons,
          "Distribution is justified because domain pressure is real and coupling is manageable.",
        ],
      };
    }

    return {
      recommendedArchitecture: "modular-monolith",
      reasons: [
        ...reasons,
        "Keep the system modular first because simplicity still beats added distributed overhead.",
      ],
    };
  }
}
