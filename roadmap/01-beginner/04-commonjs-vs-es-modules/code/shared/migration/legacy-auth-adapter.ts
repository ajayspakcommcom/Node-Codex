import type { AuthContext, LegacyAuthModule } from "./legacy-auth-contracts.js";

export function createAuthAdapter(legacyModule: LegacyAuthModule) {
  return {
    authenticate(token: string): AuthContext | null {
      const result = legacyModule.validateToken(token);

      if (!result) {
        return null;
      }

      return {
        userId: result.userId,
        scope: result.scope,
      };
    },
  };
}
