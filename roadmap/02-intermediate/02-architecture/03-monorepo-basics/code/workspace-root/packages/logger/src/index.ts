export function createLogger(scope: string) {
  return {
    info(message: string, metadata?: Record<string, unknown>) {
      console.log(
        JSON.stringify({
          scope,
          message,
          metadata,
        }),
      );
    },
  };
}
