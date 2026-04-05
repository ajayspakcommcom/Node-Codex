import { seededIdentitiesByToken } from "../../shared/chat-runtime.js";
import type { ChatIdentity } from "../../shared/chat-types.js";

export class AuthService {
  public authenticate(token: string): ChatIdentity {
    const identity = seededIdentitiesByToken[token];

    if (identity === undefined) {
      throw new Error("Invalid chat token.");
    }

    return {
      ...identity,
      roles: [...identity.roles],
    };
  }
}
