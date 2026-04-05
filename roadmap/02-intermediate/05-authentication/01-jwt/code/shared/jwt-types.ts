export interface JwtHeader {
  readonly alg: "HS256";
  readonly typ: "JWT";
  readonly kid: string;
}

export interface AccessTokenClaims {
  readonly iss: string;
  readonly aud: string;
  readonly sub: string;
  readonly tenantId: string;
  readonly roles: readonly string[];
  readonly scopes: readonly string[];
  readonly iat: number;
  readonly exp: number;
  readonly jti: string;
  readonly sid: string;
}

export interface JwtVerificationContext {
  readonly issuer: string;
  readonly audience: string;
  readonly nowEpochSeconds: number;
}

export interface SigningKey {
  readonly kid: string;
  readonly secret: string;
  readonly status: "active" | "verifying-only" | "retired";
}

export interface VerifiedAccessToken {
  readonly header: JwtHeader;
  readonly claims: AccessTokenClaims;
}

export interface PermissionRequirement {
  readonly anyRole?: readonly string[];
  readonly anyScope?: readonly string[];
}
