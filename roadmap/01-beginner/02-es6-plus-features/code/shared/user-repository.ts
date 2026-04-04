export interface UserEntity {
  readonly id: string;
  readonly email: string;
  readonly role: "admin" | "member";
  readonly status: "active" | "disabled";
  readonly profile?: {
    readonly firstName?: string;
    readonly lastName?: string;
    readonly timezone?: string;
  };
}

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
}

export const userRepository: UserRepository = {
  async findById(id: string): Promise<UserEntity | null> {
    if (id !== "usr_101") {
      return null;
    }

    return {
      id: "usr_101",
      email: "engineer@example.com",
      role: "admin",
      status: "active",
      profile: {
        firstName: "Node",
        lastName: "Engineer",
        timezone: "Asia/Kolkata",
      },
    };
  },
};
