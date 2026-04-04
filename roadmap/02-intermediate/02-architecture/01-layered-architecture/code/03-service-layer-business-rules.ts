import { logger } from "./shared/logger.js";
import { TaskService } from "./module/services/task-service.js";
import { TaskRepository } from "./module/repositories/task-repository.js";

const service = new TaskService(new TaskRepository());

try {
  service.createTask("x");
} catch (error) {
  logger.warn("Service-layer business rule enforced", {
    error,
    guidance: "Validation and business decisions belong in the service boundary, not inside the repository.",
  });
}
