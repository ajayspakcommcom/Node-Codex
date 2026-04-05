export interface AccessTokenRecord {
  readonly token: string;
  readonly subject: string;
  readonly sessionId: string;
  readonly expiresAtEpochSeconds: number;
}

export interface RefreshTokenRecord {
  readonly tokenId: string;
  readonly sessionId: string;
  readonly familyId: string;
  readonly subject: string;
  readonly issuedAtEpochSeconds: number;
  readonly expiresAtEpochSeconds: number;
  readonly replacedByTokenId?: string;
  readonly revokedAtEpochSeconds?: number;
}

export interface SessionFamilyRecord {
  readonly familyId: string;
  readonly subject: string;
  readonly status: "active" | "revoked";
  readonly revokedReason?: string;
}
