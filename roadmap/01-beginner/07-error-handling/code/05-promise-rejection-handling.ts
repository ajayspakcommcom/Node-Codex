import { InfrastructureError } from "./shared/errors.js";

function publishToQueue(): Promise<void> {
  return Promise.reject(new InfrastructureError("Queue publish failed"));
}

publishToQueue().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error("Promise rejection handled:", error.name, error.message);
  }
});
