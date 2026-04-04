export function readSharedConfig(): { readonly environment: "development" | "production" } {
  return {
    environment: "development",
  };
}
