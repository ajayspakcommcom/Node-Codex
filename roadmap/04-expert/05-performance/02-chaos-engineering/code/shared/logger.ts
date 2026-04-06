export function logChaosDecision(message: string, context: Record<string, unknown>): void {
  console.log(
    JSON.stringify({
      level: "info",
      message,
      ...context,
    }),
  );
}
