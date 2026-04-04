import { InfrastructureError } from "./shared/errors.js";

async function fetchInventory(): Promise<{ available: boolean }> {
  throw new InfrastructureError("Inventory service timeout");
}

async function main(): Promise<void> {
  try {
    await fetchInventory();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Async error handled:", error.name, error.message);
    }
  }
}

void main();
