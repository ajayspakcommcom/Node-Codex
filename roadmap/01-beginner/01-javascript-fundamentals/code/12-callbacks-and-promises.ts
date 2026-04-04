import { setFailureExitCode } from "./shared/node-runtime.js";

interface CallbackUser {
  readonly id: string;
  readonly email: string;
}

type UserCallback = (error: Error | null, user?: CallbackUser) => void;

function fetchUserWithCallback(userId: string, callback: UserCallback): void {
  setTimeout(() => {
    if (userId !== "usr_1") {
      callback(new Error("User not found"));
      return;
    }

    callback(null, { id: "usr_1", email: "callback@example.com" });
  }, 10);
}

function fetchUserWithPromise(userId: string): Promise<CallbackUser> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId !== "usr_1") {
        reject(new Error("User not found"));
        return;
      }

      resolve({ id: "usr_1", email: "promise@example.com" });
    }, 10);
  });
}

function runCallbackExample(): Promise<void> {
  return new Promise((resolve, reject) => {
    fetchUserWithCallback("usr_1", (error, user) => {
      if (error) {
        reject(error);
        return;
      }

      console.log("Callback result:", user);
      resolve();
    });
  });
}

async function main(): Promise<void> {
  await runCallbackExample();

  const user = await fetchUserWithPromise("usr_1");
  console.log("Promise result:", user);
}

main().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
  }
  setFailureExitCode();
});
