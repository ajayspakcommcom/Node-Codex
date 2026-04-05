import { createHmac, randomUUID } from "node:crypto";

import { authConfig } from "../../shared/auth-service-runtime.js";
import type { AccessTokenClaims, AccessTokenRecord, Permission, UserRecord } from "../../shared/auth-service-types.js";

function encodeBase64Url(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function decodeBase64Url(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

export class TokenService {
  public issueAccessToken(input: {
    readonly user: UserRecord;
    readonly permissions: readonly Permission[];
    readonly sessionId: string;
    readonly nowEpochSeconds: number;
  }): AccessTokenRecord {
    const claims: AccessTokenClaims = {
      iss: authConfig.issuer,
      aud: authConfig.audience,
      sub: input.user.id,
      email: input.user.email,
      tenantId: input.user.tenantId,
      roles: [...input.user.roles],
      scopes: [...input.permissions],
      sid: input.sessionId,
      jti: randomUUID(),
      iat: input.nowEpochSeconds,
      exp: input.nowEpochSeconds + authConfig.accessTokenLifetimeSeconds,
    };

    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const encodedHeader = encodeBase64Url(JSON.stringify(header));
    const encodedPayload = encodeBase64Url(JSON.stringify(claims));
    const signature = createHmac("sha256", authConfig.signingSecret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64url");

    return {
      token: `${encodedHeader}.${encodedPayload}.${signature}`,
      claims,
    };
  }

  public verifyAccessToken(token: string, nowEpochSeconds: number): AccessTokenClaims {
    const [encodedHeader, encodedPayload, signature] = token.split(".");

    if (encodedHeader === undefined || encodedPayload === undefined || signature === undefined) {
      throw new Error("Malformed access token.");
    }

    const expectedSignature = createHmac("sha256", authConfig.signingSecret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64url");

    if (signature !== expectedSignature) {
      throw new Error("Invalid access token signature.");
    }

    const claims = JSON.parse(decodeBase64Url(encodedPayload)) as AccessTokenClaims;

    if (claims.iss !== authConfig.issuer || claims.aud !== authConfig.audience) {
      throw new Error("Access token audience or issuer mismatch.");
    }

    if (claims.exp <= nowEpochSeconds) {
      throw new Error("Access token expired.");
    }

    return claims;
  }

  public issueRefreshToken(): string {
    return `rt_${randomUUID()}`;
  }
}
