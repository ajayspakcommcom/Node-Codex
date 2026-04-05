import type { PermissionRequirement, VerifiedAccessToken } from "../../shared/jwt-types.js";

export class AuthorizationService {
  public hasAccess(token: VerifiedAccessToken, requirement: PermissionRequirement): boolean {
    const roleAllowed =
      requirement.anyRole === undefined ||
      requirement.anyRole.some((role) => token.claims.roles.includes(role));
    const scopeAllowed =
      requirement.anyScope === undefined ||
      requirement.anyScope.some((scope) => token.claims.scopes.includes(scope));

    return roleAllowed && scopeAllowed;
  }
}
