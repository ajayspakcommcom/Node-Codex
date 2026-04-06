import type { ReleaseType } from "./semver-policy.js";

export interface ReleaseSummaryInput {
  version: string;
  releaseType: ReleaseType;
  changelogEntries: number;
}

export interface ReleaseSummary {
  version: string;
  releaseType: ReleaseType;
  readyForPublication: boolean;
}

export function buildReleaseSummary(input: ReleaseSummaryInput): ReleaseSummary {
  return {
    version: input.version,
    releaseType: input.releaseType,
    readyForPublication: input.changelogEntries > 0,
  };
}
