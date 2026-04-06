export function logDecision(event: string, details: Record<string, unknown>): void {
  console.log(JSON.stringify({ event, ...details }));
}
