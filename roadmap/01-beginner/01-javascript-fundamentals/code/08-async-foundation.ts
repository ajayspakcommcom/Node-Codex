import { setFailureExitCode } from "./shared/node-runtime.js";

interface UserProfile {
  readonly id: string;
  readonly email: string;
  readonly role: string;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function findUserById(userId: string): Promise<UserProfile | null> {
  await wait(50);

  if (userId !== "usr_2001") {
    return null;
  }

  return {
    id: "usr_2001",
    email: "backend@example.com",
    role: "engineer",
  };
}

async function loadUserProfile(userId: string): Promise<UserProfile> {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}

async function main(): Promise<void> {
  try {
    const profile = await loadUserProfile("usr_2001");
    console.log(profile);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Request failed:", error.message);
    }
    setFailureExitCode();
  }
}

main();
