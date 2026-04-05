import type { Permission, UserRecord } from "./auth-service-types.js";

export const authConfig = {
  issuer: "https://identity.acme.example",
  audience: "node-codex-enterprise-api",
  signingSecret: "auth-service-enterprise-demo-signing-secret",
  accessTokenLifetimeSeconds: 900,
  refreshTokenLifetimeSeconds: 60 * 60 * 24 * 14,
  defaultNowEpochSeconds: 1_775_338_800,
} as const;

export const permissionCatalog: Readonly<Record<string, readonly Permission[]>> = {
  member: ["profile:read", "sessions:self"],
  support: ["profile:read", "sessions:self", "tenant:read", "support:assist"],
  admin: ["profile:read", "sessions:self", "sessions:revoke", "tenant:read", "tenant:manage", "audit:read"],
} as const;

export const seedUsers: readonly UserRecord[] = [
  {
    id: "user_member_alpha",
    email: "member@tenant-alpha.example",
    tenantId: "tenant_alpha",
    passwordHash: "hashed::ChangeMe123!::auth-service-enterprise-salt",
    roles: ["member"],
    status: "active",
  },
  {
    id: "user_support_alpha",
    email: "support@tenant-alpha.example",
    tenantId: "tenant_alpha",
    passwordHash: "hashed::Support123!::auth-service-enterprise-salt",
    roles: ["support"],
    status: "active",
  },
  {
    id: "user_admin_alpha",
    email: "admin@tenant-alpha.example",
    tenantId: "tenant_alpha",
    passwordHash: "hashed::Admin123!::auth-service-enterprise-salt",
    roles: ["admin"],
    status: "active",
  },
  {
    id: "user_admin_beta",
    email: "admin@tenant-beta.example",
    tenantId: "tenant_beta",
    passwordHash: "hashed::BetaAdmin123!::auth-service-enterprise-salt",
    roles: ["admin"],
    status: "active",
  },
] as const;

export function cloneSeedUsers(): UserRecord[] {
  return seedUsers.map((user) => ({
    ...user,
    roles: [...user.roles],
  }));
}
