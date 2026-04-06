interface RefreshTokenRecord {
  readonly userId: string;
  readonly deviceId: string;
  used: boolean;
  revoked: boolean;
}

export class RefreshTokenStore {
  private readonly tokens = new Map<string, RefreshTokenRecord>();

  issue(userId: string, deviceId: string): string {
    const tokenId = `rt_${Math.random().toString(36).slice(2, 10)}`;

    this.tokens.set(tokenId, {
      userId,
      deviceId,
      used: false,
      revoked: false,
    });

    return tokenId;
  }

  markUsed(tokenId: string): void {
    const record = this.tokens.get(tokenId);

    if (!record) {
      throw new Error("Unknown refresh token");
    }

    record.used = true;
  }

  revoke(tokenId: string): void {
    const record = this.tokens.get(tokenId);

    if (!record) {
      throw new Error("Unknown refresh token");
    }

    record.revoked = true;
  }

  isUsed(tokenId: string): boolean {
    return this.tokens.get(tokenId)?.used ?? false;
  }

  isRevoked(tokenId: string): boolean {
    return this.tokens.get(tokenId)?.revoked ?? false;
  }
}
