function createLogger(serviceName) {
  return {
    info(message, metadata = {}) {
      console.log(`[${serviceName}] ${message}`, metadata);
    },
  };
}

module.exports = {
  createLogger,
};
