import type { RegionPlan, WorkloadProfile } from "../../shared/aws-types.js";

export class RegionAvailabilityAdvisor {
  public planFor(workload: WorkloadProfile): RegionPlan {
    const regions = workload.globalUsers ? ["ap-south-1", "eu-west-1"] : ["ap-south-1"];
    const reasoning = [
      workload.globalUsers
        ? "Global users may justify multi-region thinking for latency and resilience."
        : "A single-region design may be enough when users are geographically concentrated.",
      workload.complianceSensitivity === "high"
        ? "Higher sensitivity workloads should make availability and data-location choices explicit."
        : "Availability choices should still be intentional even for moderate workloads.",
    ];

    return {
      regions,
      multiAz: workload.complianceSensitivity !== "low",
      reasoning,
    };
  }
}
