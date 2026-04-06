export class RetentionPolicy {
  public constructor(private readonly retentionDays: ReadonlyMap<string, number>) {}

  public daysFor(dataSet: string): number {
    const days = this.retentionDays.get(dataSet);

    if (days === undefined) {
      throw new Error(`No retention policy configured for ${dataSet}`);
    }

    return days;
  }
}

export function createRetentionPolicy(): RetentionPolicy {
  return new RetentionPolicy(
    new Map<string, number>([
      ["customer-profile", 365],
      ["audit-log", 730],
    ]),
  );
}
