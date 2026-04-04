export function createLogger(serviceName) {
  return {
    info(message, metadata = {}) {
      console.log(`[${serviceName}] ${message}`, metadata);
    },
  };
}
