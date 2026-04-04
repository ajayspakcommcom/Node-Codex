import { userRepository, type UserEntity } from "./shared/user-repository.js";

interface UserResponse {
  readonly id: string;
  readonly email: string;
  readonly fullName: string;
  readonly role: string;
}

function mapUserToResponse(user: UserEntity): UserResponse {
  const {
    id,
    email,
    role,
    profile: { firstName = "", lastName = "" } = {},
  } = user;

  return {
    id,
    email,
    fullName: `${firstName} ${lastName}`.trim(),
    role,
  };
}

async function main(): Promise<void> {
  const user = await userRepository.findById("usr_101");

  if (!user) {
    throw new Error("User not found");
  }

  console.log(mapUserToResponse(user));
}

void main();
