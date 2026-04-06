export interface AccessCheck {
  principal: string;
  resource: string;
}

export class AuthorizationPolicy {
  public constructor(private readonly allowedAccess: ReadonlyMap<string, readonly string[]>) {}

  public isAllowed(input: AccessCheck): boolean {
    const resources = this.allowedAccess.get(input.principal) ?? [];
    return resources.includes(input.resource);
  }
}

export function createDefaultAuthorizationPolicy(): AuthorizationPolicy {
  return new AuthorizationPolicy(
    new Map<string, readonly string[]>([
      ["orders-service", ["payments.capture", "inventory.reserve"]],
      ["payments-service", ["ledger.write"]],
      ["support-operator", ["orders.read", "customers.read"]],
    ]),
  );
}
