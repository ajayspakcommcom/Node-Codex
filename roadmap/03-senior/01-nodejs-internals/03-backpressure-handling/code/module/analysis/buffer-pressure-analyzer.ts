import type { QueueSnapshot } from "../../shared/backpressure-types.js";

export class BufferPressureAnalyzer {
  public classify(snapshot: QueueSnapshot): {
    readonly riskLevel: "low" | "medium" | "high";
    readonly findings: readonly string[];
  } {
    const findings: string[] = [];

    if (snapshot.queuedItems > 0) {
      findings.push("Buffered work exists and should remain observable.");
    }

    if (snapshot.queuedItems >= 3) {
      findings.push("Queue depth is high enough to suggest producer-consumer mismatch.");
    }

    if (snapshot.rejected > 0) {
      findings.push("The system is shedding or rejecting work under pressure.");
    }

    if (snapshot.queuedItems >= 3 || snapshot.rejected > 0) {
      return {
        riskLevel: "high",
        findings,
      };
    }

    if (snapshot.queuedItems > 0) {
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
