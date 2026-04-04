import { InfrastructureError } from "./shared/errors.js";

async function readExternalBalance(): Promise<number> {
  throw new InfrastructureError("Banking gateway unavailable");
}

async function main(): Promise<void> {
  try {
    await readExternalBalance();
  } catch (error: unknown) {
    if (error instanceof InfrastructureError) {
      console.error("Infrastructure failure kept separate from user input issues:", {
        code: error.code,
        message: error.message,
      });
    }
  }
}

void main();
