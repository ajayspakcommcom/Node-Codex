import { randomUUID } from "node:crypto";

import type { RefreshTokenRecord } from "../../shared/refresh-types.js";

export class RefreshTokenStore {
  private readonly tokens = new Map<string, RefreshTokenRecord>();

  public issue(input: {
    readonly sessionId: string;
    readonly familyId: string;
    readonly subject: string;
    readonly nowEpochSeconds: number;
    readonly lifetimeSeconds: number;
  }): RefreshTokenRecord {
    const token: RefreshTokenRecord = {
      tokenId: `rtk_${randomUUID()}`,
      sessionId: input.sessionId,
      familyId: input.familyId,
      subject: input.subject,
      issuedAtEpochSeconds: input.nowEpochSeconds,
      expiresAtEpochSeconds: input.nowEpochSeconds + input.lifetimeSeconds,
    };

    this.tokens.set(token.tokenId, token);
    return token;
  }

  public rotate(tokenId: string, input: {
    readonly nowEpochSeconds: number;
    readonly lifetimeSeconds: number;
  }): {
    readonly current: RefreshTokenRecord;
    readonly replacement: RefreshTokenRecord;
  } {
    const current = this.getRequired(tokenId);

    if (current.revokedAtEpochSeconds !== undefined) {
      throw new Error("Refresh token has been revoked.");
    }

    if (current.expiresAtEpochSeconds <= input.nowEpochSeconds) {
      throw new Error("Refresh token has expired.");
    }

    if (current.replacedByTokenId !== undefined) {
      throw new Error("Refresh token reuse detected.");
    }

    const replacement: RefreshTokenRecord = {
      tokenId: `rtk_${randomUUID()}`,
      sessionId: current.sessionId,
      familyId: current.familyId,
      subject: current.subject,
      issuedAtEpochSeconds: input.nowEpochSeconds,
      expiresAtEpochSeconds: input.nowEpochSeconds + input.lifetimeSeconds,
    };

    this.tokens.set(current.tokenId, {
      ...current,
      replacedByTokenId: replacement.tokenId,
    });
    this.tokens.set(replacement.tokenId, replacement);

    return {
      current: this.getRequired(current.tokenId),
      replacement,
    };
  }

  public revokeFamily(familyId: string, nowEpochSeconds: number): readonly RefreshTokenRecord[] {
    const revoked: RefreshTokenRecord[] = [];

    for (const token of this.tokens.values()) {
      if (token.familyId !== familyId) {
        continue;
      }

      const updated: RefreshTokenRecord = {
        ...token,
        revokedAtEpochSeconds: nowEpochSeconds,
      };

      this.tokens.set(token.tokenId, updated);
      revoked.push(updated);
    }

    return revoked;
  }

  public getRequired(tokenId: string): RefreshTokenRecord {
    const token = this.tokens.get(tokenId);

    if (token === undefined) {
      throw new Error(`Refresh token ${tokenId} was not found.`);
    }

    return token;
  }

  public listByFamily(familyId: string): readonly RefreshTokenRecord[] {
    return [...this.tokens.values()].filter((token) => token.familyId === familyId);
  }
}
