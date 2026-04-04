export interface InternalUserRecord {
  readonly id: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly lastLoginIp: string;
  readonly status: "active" | "disabled";
}

export function loadInternalUserRecord(userId: string): InternalUserRecord {
  return {
    id: userId,
    email: "boundary@example.com",
    passwordHash: "hidden",
    lastLoginIp: "10.10.10.10",
    status: "active",
  };
}
