export interface ServiceCall {
  sourceService: string;
  destinationService: string;
}

export class AuthorizationPolicy {
  public constructor(private readonly allowedCalls: ReadonlyMap<string, readonly string[]>) {}

  public isAllowed(call: ServiceCall): boolean {
    const allowedDestinations = this.allowedCalls.get(call.sourceService) ?? [];
    return allowedDestinations.includes(call.destinationService);
  }
}

export function createDefaultAuthorizationPolicy(): AuthorizationPolicy {
  return new AuthorizationPolicy(
    new Map<string, readonly string[]>([
      ["api-gateway", ["catalog-service", "orders-service", "payments-service"]],
      ["orders-service", ["inventory-service", "payments-service"]],
      ["payments-service", ["ledger-service"]],
    ]),
  );
}
