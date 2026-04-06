export interface CostOwner {
  serviceName: string;
  owningTeam: string;
  environment: string;
}

export class AttributionRegistry {
  public constructor(private readonly owners: readonly CostOwner[]) {}

  public findOwner(serviceName: string): CostOwner {
    const owner = this.owners.find((candidate) => candidate.serviceName === serviceName);

    if (!owner) {
      throw new Error(`No cost owner registered for ${serviceName}`);
    }

    return owner;
  }
}

export function createDefaultAttributionRegistry(): AttributionRegistry {
  return new AttributionRegistry([
    {
      serviceName: "catalog-api",
      owningTeam: "commerce-platform",
      environment: "production",
    },
    {
      serviceName: "analytics-batch",
      owningTeam: "data-platform",
      environment: "production",
    },
  ]);
}
