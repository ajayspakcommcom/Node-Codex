import { setFailureExitCode } from "./shared/node-runtime.js";

type UserStatus = "invited" | "active" | "disabled";

interface UserEntity {
  readonly id: string;
  readonly email: string;
  readonly role: string;
  readonly status: UserStatus;
}

interface UserDto {
  readonly id: string;
  readonly email: string;
  readonly role: string;
}

interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  save(user: UserEntity): Promise<void>;
}

function mapUserEntityToDto(userEntity: UserEntity): UserDto {
  return {
    id: userEntity.id,
    email: userEntity.email,
    role: userEntity.role,
  };
}

function validateUserStatusTransition(currentStatus: UserStatus, nextStatus: UserStatus): boolean {
  const allowedTransitions = {
    invited: ["active", "disabled"],
    active: ["disabled"],
    disabled: ["active"],
  } as const;

  return allowedTransitions[currentStatus]?.includes(nextStatus) ?? false;
}

function createUserStatusService({ userRepository }: { userRepository: UserRepository }) {
  async function changeStatus(userId: string, nextStatus: UserStatus): Promise<UserDto> {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (!validateUserStatusTransition(user.status, nextStatus)) {
      throw new Error("Invalid status transition");
    }

    const updatedUser = {
      ...user,
      status: nextStatus,
    };

    await userRepository.save(updatedUser);
    return mapUserEntityToDto(updatedUser);
  }

  return {
    changeStatus,
  };
}

const userRepository: UserRepository = {
  async findById(id: string): Promise<UserEntity> {
    return { id, email: "maintainable@example.com", role: "member", status: "invited" };
  },
  async save(user: UserEntity): Promise<void> {
    console.log("Persisted user:", user);
  },
};

async function main(): Promise<void> {
  const service = createUserStatusService({ userRepository });
  const result = await service.changeStatus("usr_22", "active");
  console.log("DTO result:", result);
}

main().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
  }
  setFailureExitCode();
});
