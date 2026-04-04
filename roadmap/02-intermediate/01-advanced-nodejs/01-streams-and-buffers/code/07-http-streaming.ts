import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";

import { logger } from "./shared/logger";

const sampleFilePath = path.resolve(
  "roadmap/02-intermediate/01-advanced-nodejs/01-streams-and-buffers/code/assets/sample-input.txt",
);

const server = createServer(async (_request, response) => {
  response.writeHead(200, {
    "content-type": "text/plain; charset=utf-8",
  });

  await pipeline(fs.createReadStream(sampleFilePath), response);
});

server.listen(0, () => {
  const address = server.address();
  logger.info("Streaming HTTP server ready", {
    address,
    note: "This example streams file content to the client without building one large response buffer.",
  });
  server.close();
});
