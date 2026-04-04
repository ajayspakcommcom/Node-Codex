function swallowedErrorPattern(): void {
  try {
    throw new Error("Something failed");
  } catch {
    // Bad pattern: swallowing the error entirely.
  }
}

function correctedPattern(): void {
  try {
    throw new Error("Something failed");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Corrected pattern logs and preserves signal:", error.message);
    }
  }
}

swallowedErrorPattern();
correctedPattern();

console.log("Other common mistakes:");
console.log("- Returning different error shapes from different handlers");
console.log("- Treating all failures as 500");
console.log("- Exposing stack traces to clients");
