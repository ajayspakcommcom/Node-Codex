import type { UserRecord } from "../../shared/auth-service-types.js";

export class InMemoryUserRepository {
  private readonly usersById = new Map<string, UserRecord>();
  private readonly usersByEmail = new Map<string, UserRecord>();

  public constructor(seedUsers: readonly UserRecord[]) {
    for (const user of seedUsers) {
      this.save(user);
    }
  }

  public findByEmail(email: string): UserRecord | undefined {
    return this.usersByEmail.get(email.toLowerCase());
  }

  public findById(userId: string): UserRecord | undefined {
    return this.usersById.get(userId);
  }

  public save(user: UserRecord): UserRecord {
    const normalized: UserRecord = {
      ...user,
      email: user.email.toLowerCase(),
      roles: [...user.roles],
    };

    this.usersById.set(normalized.id, normalized);
    this.usersByEmail.set(normalized.email, normalized);

    return normalized;
  }

  public list(): readonly UserRecord[] {
    return [...this.usersById.values()];
  }
}
