import type { JwtVerificationContext, VerifiedAccessToken } from "../../shared/jwt-types.js";
import { HmacJwtService } from "./hmac-jwt-service.js";
import { RevocationStore } from "./revocation-store.js";

export class TokenAuthenticator {
  public constructor(
    private readonly jwtService: HmacJwtService,
    private readonly revocationStore: RevocationStore,
  ) {}

  public authenticate(token: string, context: JwtVerificationContext): VerifiedAccessToken {
    const verified = this.jwtService.verifySignature(token);
    const { claims } = verified;

    if (claims.iss !== context.issuer) {
      throw new Error("JWT issuer validation failed.");
    }

    if (claims.aud !== context.audience) {
      throw new Error("JWT audience validation failed.");
    }

    if (claims.exp <= context.nowEpochSeconds) {
      throw new Error("JWT has expired.");
    }

    if (claims.iat > context.nowEpochSeconds + 60) {
      throw new Error("JWT issue time is invalid.");
    }

    if (this.revocationStore.isRevoked(claims.jti)) {
      throw new Error("JWT has been revoked.");
    }

    return verified;
  }
}
