import type { HeapSignal, LeakAssessment } from "../../shared/memory-types.js";

export class ProfilingAdvisor {
  public recommend(signal: HeapSignal, assessment: LeakAssessment): {
    readonly action: string;
    readonly reason: string;
  } {
    if (assessment.riskLevel === "high" || signal.gcPressure === "high") {
      return {
        action: "capture heap snapshot and compare retained objects over time",
        reason: "evidence suggests unhealthy retention or strong GC pressure",
      };
    }

    if (assessment.riskLevel === "medium") {
      return {
        action: "profile the suspected allocation path and validate whether growth is bounded",
        reason: "there are signals worth investigating before the issue scales further",
      };
    }

    return {
      action: "continue monitoring and document expected growth behavior",
      reason: "current signal looks stable and bounded",
    };
  }
}
