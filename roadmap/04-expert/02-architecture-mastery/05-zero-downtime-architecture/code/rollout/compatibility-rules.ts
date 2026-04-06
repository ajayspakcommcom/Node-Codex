export interface ServiceRelease {
  version: string;
  minReadableSchemaVersion: number;
  maxWritableSchemaVersion: number;
  acceptedContractVersions: readonly string[];
  emittedContractVersions: readonly string[];
}

export interface RuntimeEnvironment {
  activeSchemaVersion: number;
  acceptedContractVersions: readonly string[];
}

function hasOverlap(left: readonly string[], right: readonly string[]): boolean {
  return left.some((value) => right.includes(value));
}

export function assertCompatibleRelease(release: ServiceRelease, runtime: RuntimeEnvironment): void {
  if (runtime.activeSchemaVersion < release.minReadableSchemaVersion) {
    throw new Error(
      `${release.version} requires schema >= ${release.minReadableSchemaVersion}, but runtime is ${runtime.activeSchemaVersion}`,
    );
  }

  if (!hasOverlap(release.acceptedContractVersions, runtime.acceptedContractVersions)) {
    throw new Error(`${release.version} does not accept any currently routed contract version`);
  }
}

export function hasRollbackOverlap(previous: ServiceRelease, next: ServiceRelease): boolean {
  const schemaOverlap =
    previous.maxWritableSchemaVersion >= next.minReadableSchemaVersion &&
    next.maxWritableSchemaVersion >= previous.minReadableSchemaVersion;

  const contractOverlap =
    hasOverlap(previous.acceptedContractVersions, next.acceptedContractVersions) &&
    hasOverlap(previous.emittedContractVersions, next.acceptedContractVersions);

  return schemaOverlap && contractOverlap;
}

export function assertRollbackSafe(previous: ServiceRelease, next: ServiceRelease): void {
  if (!hasRollbackOverlap(previous, next)) {
    throw new Error(`Rollback from ${next.version} to ${previous.version} is not safe`);
  }
}
