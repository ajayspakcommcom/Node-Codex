import { randomUUID } from "node:crypto";

import type { AuthorizationCodeGrant } from "../../shared/oauth2-types.js";

export class AuthorizationCodeStore {
  private readonly codes = new Map<string, AuthorizationCodeGrant>();

  public issue(input: Omit<AuthorizationCodeGrant, "code">): AuthorizationCodeGrant {
    const grant: AuthorizationCodeGrant = {
      code: `code_${randomUUID()}`,
      ...input,
    };

    this.codes.set(grant.code, grant);
    return grant;
  }

  public consume(code: string, nowEpochSeconds: number): AuthorizationCodeGrant {
    const grant = this.codes.get(code);

    if (grant === undefined) {
      throw new Error("Authorization code is invalid or already used.");
    }

    this.codes.delete(code);

    if (grant.expiresAtEpochSeconds <= nowEpochSeconds) {
      throw new Error("Authorization code has expired.");
    }

    return grant;
  }
}
