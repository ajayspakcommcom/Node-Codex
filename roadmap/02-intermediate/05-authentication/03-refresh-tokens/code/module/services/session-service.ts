import { accessTokenLifetimeSeconds, refreshTokenLifetimeSeconds } from "../../shared/refresh-runtime.js";
import type { AccessTokenRecord, RefreshTokenRecord } from "../../shared/refresh-types.js";
import { AccessTokenService } from "./access-token-service.js";
import { RefreshTokenStore } from "./refresh-token-store.js";
import { SessionFamilyStore } from "./session-family-store.js";

export class SessionService {
  public constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenStore: RefreshTokenStore,
    private readonly sessionFamilyStore: SessionFamilyStore,
  ) {}

  public startSession(input: {
    readonly subject: string;
    readonly sessionId: string;
    readonly familyId: string;
    readonly nowEpochSeconds: number;
  }): {
    readonly accessToken: AccessTokenRecord;
    readonly refreshToken: RefreshTokenRecord;
  } {
    this.sessionFamilyStore.ensureFamily(input.familyId, input.subject);

    return {
      accessToken: this.accessTokenService.issue({
        subject: input.subject,
        sessionId: input.sessionId,
        nowEpochSeconds: input.nowEpochSeconds,
        lifetimeSeconds: accessTokenLifetimeSeconds,
      }),
      refreshToken: this.refreshTokenStore.issue({
        subject: input.subject,
        sessionId: input.sessionId,
        familyId: input.familyId,
        nowEpochSeconds: input.nowEpochSeconds,
        lifetimeSeconds: refreshTokenLifetimeSeconds,
      }),
    };
  }

  public refresh(input: {
    readonly refreshTokenId: string;
    readonly nowEpochSeconds: number;
  }): {
    readonly accessToken: AccessTokenRecord;
    readonly refreshToken: RefreshTokenRecord;
  } {
    const current = this.refreshTokenStore.getRequired(input.refreshTokenId);
    const family = this.sessionFamilyStore.getRequired(current.familyId);

    if (family.status === "revoked") {
      throw new Error(`Session family is revoked: ${family.revokedReason ?? "no reason provided"}.`);
    }

    const rotated = this.refreshTokenStore.rotate(input.refreshTokenId, {
      nowEpochSeconds: input.nowEpochSeconds,
      lifetimeSeconds: refreshTokenLifetimeSeconds,
    });

    return {
      accessToken: this.accessTokenService.issue({
        subject: current.subject,
        sessionId: current.sessionId,
        nowEpochSeconds: input.nowEpochSeconds,
        lifetimeSeconds: accessTokenLifetimeSeconds,
      }),
      refreshToken: rotated.replacement,
    };
  }

  public handleReuseDetection(refreshTokenId: string, nowEpochSeconds: number): {
    readonly familyStatus: string;
    readonly revokedTokens: number;
  } {
    const current = this.refreshTokenStore.getRequired(refreshTokenId);
    this.sessionFamilyStore.revokeFamily(current.familyId, "refresh token replay detected");
    const revoked = this.refreshTokenStore.revokeFamily(current.familyId, nowEpochSeconds);

    return {
      familyStatus: this.sessionFamilyStore.getRequired(current.familyId).status,
      revokedTokens: revoked.length,
    };
  }

  public logout(familyId: string, nowEpochSeconds: number): {
    readonly revokedTokens: number;
  } {
    this.sessionFamilyStore.revokeFamily(familyId, "user logout");
    const revoked = this.refreshTokenStore.revokeFamily(familyId, nowEpochSeconds);

    return {
      revokedTokens: revoked.length,
    };
  }
}
