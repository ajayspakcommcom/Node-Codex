import { memoryRuntime } from "../../shared/memory-runtime.js";
import type { LeakAssessment, RetentionSubject } from "../../shared/memory-types.js";

export class RetentionAnalyzer {
  public assess(subject: RetentionSubject): LeakAssessment {
    const findings: string[] = [];

    if (!subject.bounded) {
      findings.push("Retention source is unbounded.");
    }

    if (subject.growthTrend === "growing") {
      findings.push("Retained object count is growing over time.");
    }

    if (subject.retainedObjects >= memoryRuntime.highRetentionThreshold) {
      findings.push("Retained object count is high enough to deserve investigation.");
    }

    if (findings.length >= 3) {
      return {
        riskLevel: "high",
        findings,
      };
    }

    if (findings.length > 0) {
      return {
        riskLevel: "medium",
        findings,
      };
    }

    return {
      riskLevel: "low",
      findings,
    };
  }
}
