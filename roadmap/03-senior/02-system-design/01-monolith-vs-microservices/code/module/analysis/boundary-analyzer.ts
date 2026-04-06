import {
  ArchitectureScorecard,
  DomainModule,
  ExtractionDecision,
  ServiceBoundaryCandidate,
} from "../../shared/architecture-types.js";

export class BoundaryAnalyzer {
  public evaluateModularMonolith(modules: DomainModule[]): ArchitectureScorecard {
    const highSeparationPressure = modules.filter(
      (module) =>
        module.independentReleasePressure === "high" &&
        module.scalingNeed === "separate",
    );

    const strengths = [
      "Keeps debugging and transactions local",
      "Reduces operational surfaces and contract overhead",
      "Allows domain modularity before distribution",
    ];

    const risks =
      highSeparationPressure.length > 1
        ? [
            "Some modules are pushing for separate release and scale",
            "Shared deployments may slow independently evolving domains",
          ]
        : ["Few hard distribution pressures are visible right now"];

    const recommendation =
      highSeparationPressure.length > 1
        ? "Keep the monolith modular, but prepare extraction boundaries around the highest-pressure domains."
        : "Prefer the modular monolith for now because the system still benefits more from simplicity.";

    return {
      architecture: "modular-monolith",
      strengths,
      risks,
      recommendation,
    };
  }

  public decideExtraction(candidate: ServiceBoundaryCandidate): ExtractionDecision {
    const reasons: string[] = [];

    if (candidate.ownedByTeams.length === 1) {
      reasons.push("Domain ownership is clear.");
    }

    if (candidate.requestVolumeShare < 0.2) {
      reasons.push("Request volume alone does not justify extraction.");
    } else {
      reasons.push("This domain carries meaningful traffic pressure.");
    }

    if (candidate.synchronousDependencies.length > 1) {
      reasons.push("Extraction would introduce critical-path network calls.");
    }

    if (candidate.sharedDataTouches.length > 2) {
      reasons.push("Shared transactional data would become a coordination cost.");
    }

    const recommendedArchitecture =
      candidate.synchronousDependencies.length > 1 &&
      candidate.sharedDataTouches.length > 2
        ? "modular-monolith"
        : "microservices";

    return {
      candidate: candidate.name,
      recommendedArchitecture,
      reasons,
    };
  }
}
