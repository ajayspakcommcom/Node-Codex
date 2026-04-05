export type Role = "member" | "support" | "admin";

export type Permission =
  | "profile:read"
  | "sessions:self"
  | "sessions:revoke"
  | "tenant:read"
  | "tenant:manage"
  | "support:assist"
  | "audit:read";

export type UserStatus = "active" | "disabled";
export type SessionStatus = "active" | "revoked" | "compromised";
export type AuditSeverity = "info" | "warn" | "error";

export interface UserRecord {
  readonly id: string;
  readonly email: string;
  readonly tenantId: string;
  readonly passwordHash: string;
  readonly roles: readonly Role[];
  readonly status: UserStatus;
}

export interface AccessTokenClaims {
  readonly iss: string;
  readonly aud: string;
  readonly sub: string;
  readonly email: string;
  readonly tenantId: string;
  readonly roles: readonly Role[];
  readonly scopes: readonly Permission[];
  readonly sid: string;
  readonly jti: string;
  readonly iat: number;
  readonly exp: number;
}

export interface AccessTokenRecord {
  readonly token: string;
  readonly claims: AccessTokenClaims;
}

export interface SessionRecord {
  readonly sessionId: string;
  readonly userId: string;
  readonly tenantId: string;
  readonly status: SessionStatus;
  readonly currentRefreshToken: string;
  readonly rotatedRefreshTokens: readonly string[];
  readonly issuedAtEpochSeconds: number;
  readonly expiresAtEpochSeconds: number;
  readonly revokedAtEpochSeconds?: number;
  readonly revokedReason?: string;
}

export interface AuthenticatedPrincipal {
  readonly userId: string;
  readonly email: string;
  readonly tenantId: string;
  readonly roles: readonly Role[];
  readonly permissions: readonly Permission[];
  readonly sessionId: string;
}

export interface AuthorizationContext {
  readonly resourceTenantId?: string;
  readonly targetUserId?: string;
}

export interface AuditEvent {
  readonly id: string;
  readonly type: string;
  readonly severity: AuditSeverity;
  readonly actorUserId?: string;
  readonly tenantId?: string;
  readonly sessionId?: string;
  readonly metadata: Readonly<Record<string, string | number | boolean>>;
}

export interface AuthTokens {
  readonly accessToken: AccessTokenRecord;
  readonly refreshToken: string;
  readonly sessionId: string;
}
