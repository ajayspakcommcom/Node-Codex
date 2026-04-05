import type { AuthenticatedIdentity } from "../../shared/socket-types.js";

const tokenToIdentityMap: Record<string, AuthenticatedIdentity> = {
  "admin-token": {
    userId: "user_admin",
    tenantId: "tenant_alpha",
    role: "admin",
  },
  "analyst-token": {
    userId: "user_analyst",
    tenantId: "tenant_alpha",
    role: "analyst",
  },
  "viewer-token": {
    userId: "user_viewer",
    tenantId: "tenant_alpha",
    role: "viewer",
  },
  "beta-viewer-token": {
    userId: "user_beta",
    tenantId: "tenant_beta",
    role: "viewer",
  },
} as const;

export class AuthService {
  public authenticate(token: string | undefined): AuthenticatedIdentity {
    if (token === undefined) {
      throw new Error("Socket connection requires an authentication token.");
    }

    const identity = tokenToIdentityMap[token];

    if (identity === undefined) {
      throw new Error("Socket token is invalid.");
    }

    return identity;
  }
}
