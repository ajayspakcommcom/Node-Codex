export class PasswordService {
  private static readonly salt = "auth-service-enterprise-salt";

  public hash(plainText: string): string {
    return `hashed::${plainText}::${PasswordService.salt}`;
  }

  public verify(plainText: string, passwordHash: string): boolean {
    return this.hash(plainText) === passwordHash;
  }
}
