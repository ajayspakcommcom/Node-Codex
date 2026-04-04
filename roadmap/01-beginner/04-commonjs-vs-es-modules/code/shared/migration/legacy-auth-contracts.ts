export interface LegacyAuthModule {
  validateToken(token: string): { userId: string; scope: string } | null;
}

export interface AuthContext {
  readonly userId: string;
  readonly scope: string;
}
