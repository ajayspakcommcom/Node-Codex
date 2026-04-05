import { randomUUID } from "node:crypto";

import type { AccessTokenRecord } from "../../shared/refresh-types.js";

export class AccessTokenService {
  public issue(input: {
    readonly subject: string;
    readonly sessionId: string;
    readonly nowEpochSeconds: number;
    readonly lifetimeSeconds: number;
  }): AccessTokenRecord {
    return {
      token: `atk_${randomUUID()}`,
      subject: input.subject,
      sessionId: input.sessionId,
      expiresAtEpochSeconds: input.nowEpochSeconds + input.lifetimeSeconds,
    };
  }
}
