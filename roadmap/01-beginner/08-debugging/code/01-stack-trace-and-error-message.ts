function levelThree(): never {
  throw new Error("Failed to load account profile: accountId was undefined");
}

function levelTwo(): void {
  levelThree();
}

function levelOne(): void {
  levelTwo();
}

try {
  levelOne();
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Error message:", error.message);
    console.error("Stack trace:");
    console.error(error.stack);
  }
}
