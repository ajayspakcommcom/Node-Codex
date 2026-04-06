export type ReleaseType = "patch" | "minor" | "major";

export interface ReleaseImpactInput {
  apiRemoved: boolean;
  apiAdded: boolean;
  bugFixOnly: boolean;
}

export function classifyReleaseImpact(input: ReleaseImpactInput): ReleaseType {
  if (input.apiRemoved) {
    return "major";
  }

  if (input.apiAdded) {
    return "minor";
  }

  if (input.bugFixOnly) {
    return "patch";
  }

  return "patch";
}
