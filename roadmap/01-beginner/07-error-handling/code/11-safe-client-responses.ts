import { createLogger } from "./shared/logger.js";
import { InfrastructureError } from "./shared/errors.js";
import { toClientErrorResponse } from "./shared/error-formatting.js";

const logger = createLogger("safe-client-responses");

const error = new InfrastructureError("Database connection refused at 10.0.0.8:5432");

logger.error("Internal diagnostic log", {
  route: "/orders/:id",
  requestId: "req_9001",
  errorName: error.name,
  message: error.message,
});

console.log("Client-safe response:", toClientErrorResponse(error));
