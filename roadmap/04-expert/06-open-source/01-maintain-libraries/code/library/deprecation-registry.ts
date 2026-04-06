export interface DeprecationNotice {
  api: string;
  removeInVersion: string;
  migrationPath: string;
}

export class DeprecationRegistry {
  public constructor(private readonly notices: readonly DeprecationNotice[]) {}

  public active(): readonly DeprecationNotice[] {
    return this.notices;
  }
}

export function createDefaultDeprecationRegistry(): DeprecationRegistry {
  return new DeprecationRegistry([
    {
      api: "createLegacyClient",
      removeInVersion: "3.0.0",
      migrationPath: "Use createClient with explicit transport options.",
    },
  ]);
}
