import express from "express";

import { authRoutes } from "./modules/auth/auth.routes";
import { taskRoutes } from "./modules/tasks/task.routes";
import { userRoutes } from "./modules/users/user.routes";
import { authenticate } from "./shared/http/authenticate";
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

app.use("/auth", authRoutes);
app.use("/users", authenticate, userRoutes);
app.use("/tasks", authenticate, taskRoutes);

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
