export class RevocationStore {
  private readonly revokedTokenIds = new Set<string>();

  public revokeToken(jti: string): void {
    this.revokedTokenIds.add(jti);
  }

  public isRevoked(jti: string): boolean {
    return this.revokedTokenIds.has(jti);
  }
}
