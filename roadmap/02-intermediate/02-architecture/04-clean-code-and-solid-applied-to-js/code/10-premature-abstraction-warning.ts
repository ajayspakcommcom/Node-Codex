import { logger } from "./shared/logger.js";

const prematureAbstraction = `
class AbstractHandlerFactoryManagerResolver {
  build(type) {
    return this.registry[type].create();
  }
}
`;

logger.warn("Premature abstraction warning", {
  prematureAbstraction,
  guidance: "Abstractions should appear after stable repeated patterns, not before the real problem is understood.",
});
