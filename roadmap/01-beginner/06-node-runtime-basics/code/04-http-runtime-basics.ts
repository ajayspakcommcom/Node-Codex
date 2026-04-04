import { createServer } from "node:http";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("http-runtime");

const server = createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader("content-type", "application/json");
  response.end(
    JSON.stringify({
      method: request.method,
      url: request.url,
      message: "Minimal Node http runtime example",
    }),
  );
});

server.listen(0, () => {
  const address = server.address();

  logger.info("HTTP server started", {
    address,
    note: "Frameworks build on top of this runtime behavior",
  });

  server.close(() => {
    logger.info("HTTP server closed");
  });
});
