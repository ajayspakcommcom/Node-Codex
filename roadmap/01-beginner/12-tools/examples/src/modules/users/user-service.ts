export interface UserSummary {
  readonly id: string;
  readonly email: string;
  readonly isActive: boolean;
}

export class UserService {
  public listActiveUsers(): readonly UserSummary[] {
    return [
      {
        id: "user_1",
        email: "ajay@example.com",
        isActive: true,
      },
      {
        id: "user_2",
        email: "ops@example.com",
        isActive: true,
      },
    ];
  }
}
