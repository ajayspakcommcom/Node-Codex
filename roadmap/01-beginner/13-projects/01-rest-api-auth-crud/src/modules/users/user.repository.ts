import type { UserRecord } from "../../infrastructure/persistence/in-memory-database";
import { generateId, inMemoryDatabase } from "../../infrastructure/persistence/in-memory-database";

interface CreateUserInput {
  readonly email: string;
  readonly name: string;
  readonly passwordHash: string;
}

export class UserRepository {
  public findByEmail(email: string): UserRecord | undefined {
    return inMemoryDatabase.users.find((user) => user.email === email);
  }

  public findById(id: string): UserRecord | undefined {
    return inMemoryDatabase.users.find((user) => user.id === id);
  }

  public create(input: CreateUserInput): UserRecord {
    const user: UserRecord = {
      id: generateId("user"),
      email: input.email,
      name: input.name,
      passwordHash: input.passwordHash,
      createdAt: new Date().toISOString(),
    };

    inMemoryDatabase.users.push(user);
    return user;
  }
}
