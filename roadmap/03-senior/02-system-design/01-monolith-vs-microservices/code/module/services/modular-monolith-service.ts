import { DomainModule } from "../../shared/architecture-types.js";

export class ModularMonolithService {
  public assessFitness(modules: DomainModule[]): string[] {
    const notes: string[] = [
      "A modular monolith keeps transactions and debugging local.",
      "This model works best when domain modules are explicit and internal contracts are respected.",
    ];

    const multiTeamPressure = new Set(modules.map((module) => module.ownedBy)).size;
    if (multiTeamPressure > 2) {
      notes.push("Multiple teams exist, so module boundaries must be formalized even before extraction.");
    }

    const separateScalingCount = modules.filter(
      (module) => module.scalingNeed === "separate",
    ).length;
    if (separateScalingCount > 1) {
      notes.push("Several modules want independent scaling, so extraction planning should start early.");
    }

    return notes;
  }
}
