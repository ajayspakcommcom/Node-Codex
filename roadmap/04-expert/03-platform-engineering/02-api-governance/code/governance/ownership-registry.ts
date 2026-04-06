export interface ContractOwner {
  contractId: string;
  owningTeam: string;
  lifecycle: "active" | "deprecated";
  contactChannel: string;
}

export class OwnershipRegistry {
  public constructor(private readonly owners: readonly ContractOwner[]) {}

  public findOwner(contractId: string): ContractOwner {
    const owner = this.owners.find((candidate) => candidate.contractId === contractId);

    if (!owner) {
      throw new Error(`No registered owner for contract ${contractId}`);
    }

    return owner;
  }
}

export function createDefaultOwnershipRegistry(): OwnershipRegistry {
  return new OwnershipRegistry([
    {
      contractId: "public.catalog.products",
      owningTeam: "catalog-platform",
      lifecycle: "active",
      contactChannel: "#catalog-api",
    },
    {
      contractId: "internal.orders.fulfillment",
      owningTeam: "order-fulfillment",
      lifecycle: "active",
      contactChannel: "#orders-fulfillment",
    },
  ]);
}
