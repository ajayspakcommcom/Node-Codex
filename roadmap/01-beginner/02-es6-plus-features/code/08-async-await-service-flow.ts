import { createLogger } from "./shared/logger.js";
import { userRepository } from "./shared/user-repository.js";

interface UserProfileDto {
  readonly id: string;
  readonly email: string;
  readonly timezone: string;
}

async function loadUserProfile(userId: string): Promise<UserProfileDto> {
  const logger = createLogger({ service: "profile-service", requestId: "req_profile_1" });
  logger.info(`Loading profile for ${userId}`);

  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    email: user.email,
    timezone: user.profile?.timezone ?? "UTC",
  };
}

async function main(): Promise<void> {
  try {
    const profile = await loadUserProfile("usr_101");
    console.log(profile);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Profile load failed:", error.message);
    }
  }
}

void main();
