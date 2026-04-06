export interface SchemaEvolutionInput {
  currentVersion: number;
  proposedVersion: number;
  backwardCompatible: boolean;
  replayCompatible: boolean;
}

export interface SchemaReview {
  approved: boolean;
  reason: string;
}

export function reviewSchemaEvolution(input: SchemaEvolutionInput): SchemaReview {
  if (input.proposedVersion <= input.currentVersion) {
    return { approved: false, reason: "schema-version-must-increase" };
  }
  if (!input.backwardCompatible) {
    return { approved: false, reason: "backward-compatibility-required" };
  }
  if (!input.replayCompatible) {
    return { approved: false, reason: "replay-compatibility-required" };
  }

  return { approved: true, reason: "schema-change-approved" };
}
