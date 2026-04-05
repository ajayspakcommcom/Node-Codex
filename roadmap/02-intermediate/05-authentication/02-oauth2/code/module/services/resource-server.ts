import type { AccessToken } from "../../shared/oauth2-types.js";

export class ResourceServer {
  public authorizeRequest(token: AccessToken, input: {
    readonly expectedAudience: string;
    readonly requiredScopes: readonly string[];
    readonly nowEpochSeconds: number;
  }): boolean {
    if (token.audience !== input.expectedAudience) {
      return false;
    }

    if (token.expiresAtEpochSeconds <= input.nowEpochSeconds) {
      return false;
    }

    return input.requiredScopes.every((scope) => token.scopes.includes(scope));
  }
}
