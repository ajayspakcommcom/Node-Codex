import type { AccessTokenClaims, SigningKey } from "./jwt-types.js";

export const signingKeys: readonly SigningKey[] = [
  {
    kid: "2026-04-primary",
    secret: "jwt-primary-signing-secret-enterprise-demo",
    status: "active",
  },
  {
    kid: "2026-03-legacy",
    secret: "jwt-legacy-signing-secret-enterprise-demo",
    status: "verifying-only",
  },
];

export const verificationContext = {
  issuer: "https://identity.acme.example",
  audience: "node-codex-api",
  nowEpochSeconds: 1_775_338_800,
} as const;

export function createBaseClaims(overrides: Partial<AccessTokenClaims> = {}): AccessTokenClaims {
  return {
    iss: verificationContext.issuer,
    aud: verificationContext.audience,
    sub: "user_42",
    tenantId: "tenant_alpha",
    roles: ["member"],
    scopes: ["orders:read"],
    iat: verificationContext.nowEpochSeconds,
    exp: verificationContext.nowEpochSeconds + 300,
    jti: "jti_001",
    sid: "sid_001",
    ...overrides,
  };
}
