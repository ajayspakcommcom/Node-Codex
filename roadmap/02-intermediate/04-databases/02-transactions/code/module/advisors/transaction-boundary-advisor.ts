import type { WorkflowStep } from "../../shared/transaction-types.js";

export class TransactionBoundaryAdvisor {
  public recommend(steps: readonly WorkflowStep[]): {
    readonly insideBoundary: readonly string[];
    readonly outsideBoundary: readonly string[];
    readonly warnings: readonly string[];
    readonly estimatedTransactionalDurationMs: number;
  } {
    const insideBoundary: string[] = [];
    const outsideBoundary: string[] = [];
    const warnings: string[] = [];
    let estimatedTransactionalDurationMs = 0;

    for (const step of steps) {
      const belongsInside =
        step.requiredForAtomicity && (step.category === "database-read" || step.category === "database-write");

      if (belongsInside) {
        insideBoundary.push(step.name);
        estimatedTransactionalDurationMs += step.estimatedDurationMs;

        if (step.estimatedDurationMs >= 500) {
          warnings.push(`${step.name} is too slow to keep inside a transaction boundary.`);
        }

        continue;
      }

      outsideBoundary.push(step.name);

      if (step.requiredForAtomicity) {
        warnings.push(`${step.name} is marked atomic but is not a database step. Revisit the workflow design.`);
      }

      if (step.category !== "database-read" && step.category !== "database-write") {
        warnings.push(`${step.name} should run after commit or through an async boundary.`);
      }
    }

    return {
      insideBoundary,
      outsideBoundary,
      warnings: [...new Set(warnings)],
      estimatedTransactionalDurationMs,
    };
  }
}
