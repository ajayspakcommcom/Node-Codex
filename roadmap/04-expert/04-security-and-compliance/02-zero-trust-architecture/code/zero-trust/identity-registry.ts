export interface WorkloadIdentity {
  principal: string;
  owner: string;
  trustTier: "internal" | "regulated";
}

export class IdentityRegistry {
  public constructor(private readonly identities: readonly WorkloadIdentity[]) {}

  public find(principal: string): WorkloadIdentity {
    const identity = this.identities.find((candidate) => candidate.principal === principal);

    if (!identity) {
      throw new Error(`No identity registered for ${principal}`);
    }

    return identity;
  }
}

export function createDefaultIdentityRegistry(): IdentityRegistry {
  return new IdentityRegistry([
    {
      principal: "orders-service",
      owner: "commerce-platform",
      trustTier: "internal",
    },
    {
      principal: "payments-service",
      owner: "payments-platform",
      trustTier: "regulated",
    },
    {
      principal: "ledger-service",
      owner: "finance-platform",
      trustTier: "regulated",
    },
  ]);
}
