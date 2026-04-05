import type { OAuth2Client } from "../../shared/oauth2-types.js";

export class ScopeService {
  public validateRequestedScopes(client: OAuth2Client, requestedScopes: readonly string[]): readonly string[] {
    const invalidScopes = requestedScopes.filter((scope) => !client.allowedScopes.includes(scope));

    if (invalidScopes.length > 0) {
      throw new Error(`OAuth2 scope validation failed for: ${invalidScopes.join(", ")}.`);
    }

    return [...requestedScopes];
  }

  public describeConsent(scopes: readonly string[]): string {
    return scopes.length === 0
      ? "No delegated permissions were requested."
      : `The client requested delegated access to: ${scopes.join(", ")}.`;
  }
}
