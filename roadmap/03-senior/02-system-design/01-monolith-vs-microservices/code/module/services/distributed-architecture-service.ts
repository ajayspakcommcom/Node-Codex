import { OperationalProfile } from "../../shared/architecture-types.js";

export class DistributedArchitectureService {
  public compareOperationalCost(
    monolith: OperationalProfile,
    microservices: OperationalProfile,
  ): string[] {
    return [
      `Monolith deployments/month: ${monolith.deploymentsPerMonth}`,
      `Microservice deployments/month: ${microservices.deploymentsPerMonth}`,
      `Monolith on-call surfaces: ${monolith.onCallSurfaces}`,
      `Microservice on-call surfaces: ${microservices.onCallSurfaces}`,
      `Monolith contract count: ${monolith.contractCount}`,
      `Microservice contract count: ${microservices.contractCount}`,
      "Distribution is justified only if the added coordination cost buys real scaling, ownership, or isolation value.",
    ];
  }
}
