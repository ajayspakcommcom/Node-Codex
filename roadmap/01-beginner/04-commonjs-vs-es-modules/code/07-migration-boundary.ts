import { createAuthAdapter } from "./shared/migration/legacy-auth-adapter.js";
import type { LegacyAuthModule } from "./shared/migration/legacy-auth-contracts.js";

const legacyAuthModule: LegacyAuthModule = {
  validateToken(token: string) {
    if (token !== "token-123") {
      return null;
    }

    return {
      userId: "usr_500",
      scope: "admin",
    };
  },
};

const authAdapter = createAuthAdapter(legacyAuthModule);

console.log("Migration boundary result:", authAdapter.authenticate("token-123"));
