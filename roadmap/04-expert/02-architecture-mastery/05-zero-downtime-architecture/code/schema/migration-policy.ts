export type MigrationPhase = "expand" | "contract";

export interface MigrationStep {
  id: string;
  phase: MigrationPhase;
  targetSchemaVersion: number;
  description: string;
}

export function validateMigrationPlan(steps: readonly MigrationStep[]): true {
  if (steps.length === 0) {
    throw new Error("Migration plan must contain at least one step");
  }

  let sawContract = false;

  for (let index = 0; index < steps.length; index += 1) {
    const current = steps[index];
    const previous = steps[index - 1];

    if (current.phase === "contract") {
      sawContract = true;
    }

    if (current.phase === "expand" && sawContract) {
      throw new Error("Expand steps cannot come after contract steps in a zero-downtime plan");
    }

    if (previous && current.targetSchemaVersion < previous.targetSchemaVersion) {
      throw new Error("Schema versions must be monotonic across migration steps");
    }
  }

  return true;
}
