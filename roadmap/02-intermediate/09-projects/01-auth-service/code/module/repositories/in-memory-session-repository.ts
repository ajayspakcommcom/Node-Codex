import type { SessionRecord } from "../../shared/auth-service-types.js";

export type RefreshTokenLookupResult =
  | {
      readonly matchType: "current";
      readonly session: SessionRecord;
    }
  | {
      readonly matchType: "rotated";
      readonly session: SessionRecord;
    }
  | undefined;

export class InMemorySessionRepository {
  private readonly sessions = new Map<string, SessionRecord>();

  public create(session: SessionRecord): SessionRecord {
    this.sessions.set(session.sessionId, session);
    return session;
  }

  public getRequired(sessionId: string): SessionRecord {
    const session = this.sessions.get(sessionId);

    if (session === undefined) {
      throw new Error(`Unknown session: ${sessionId}`);
    }

    return session;
  }

  public findByRefreshToken(refreshToken: string): RefreshTokenLookupResult {
    for (const session of this.sessions.values()) {
      if (session.currentRefreshToken === refreshToken) {
        return {
          matchType: "current",
          session,
        };
      }

      if (session.rotatedRefreshTokens.includes(refreshToken)) {
        return {
          matchType: "rotated",
          session,
        };
      }
    }

    return undefined;
  }

  public rotateRefreshToken(input: {
    readonly sessionId: string;
    readonly previousRefreshToken: string;
    readonly nextRefreshToken: string;
  }): SessionRecord {
    const session = this.getRequired(input.sessionId);

    const updated: SessionRecord = {
      ...session,
      currentRefreshToken: input.nextRefreshToken,
      rotatedRefreshTokens: [...session.rotatedRefreshTokens, input.previousRefreshToken],
    };

    this.sessions.set(updated.sessionId, updated);
    return updated;
  }

  public revoke(input: {
    readonly sessionId: string;
    readonly revokedAtEpochSeconds: number;
    readonly reason: string;
    readonly status?: "revoked" | "compromised";
  }): SessionRecord {
    const session = this.getRequired(input.sessionId);
    const updated: SessionRecord = {
      ...session,
      status: input.status ?? "revoked",
      revokedAtEpochSeconds: input.revokedAtEpochSeconds,
      revokedReason: input.reason,
    };

    this.sessions.set(updated.sessionId, updated);
    return updated;
  }

  public listByUser(userId: string): readonly SessionRecord[] {
    return [...this.sessions.values()].filter((session) => session.userId === userId);
  }
}
