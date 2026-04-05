import { randomUUID } from "node:crypto";

import type { AccessToken, OAuth2Flow } from "../../shared/oauth2-types.js";

export class TokenService {
  public issueAccessToken(input: {
    readonly clientId: string;
    readonly subject: string;
    readonly scopes: readonly string[];
    readonly audience: string;
    readonly grantType: OAuth2Flow;
    readonly nowEpochSeconds: number;
    readonly lifetimeSeconds: number;
  }): AccessToken {
    return {
      token: `atk_${randomUUID()}`,
      clientId: input.clientId,
      subject: input.subject,
      scopes: [...input.scopes],
      audience: input.audience,
      expiresAtEpochSeconds: input.nowEpochSeconds + input.lifetimeSeconds,
      grantType: input.grantType,
    };
  }
}
