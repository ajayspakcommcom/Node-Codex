import express from "express";

import { fileRoutes } from "./modules/files/file.routes";
import { errorMiddleware } from "./shared/http/error-middleware";
import { requestContextMiddleware } from "./shared/http/request-context";

export const app = express();

app.use(express.json());
app.use(requestContextMiddleware);

app.get("/health", (_request, response) => {
  response.status(200).json({
    success: true,
    data: {
      status: "ok",
    },
  });
});

app.use("/files", fileRoutes);

app.use((_request, response) => {
  response.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "Route not found.",
    },
  });
});

app.use(errorMiddleware);
