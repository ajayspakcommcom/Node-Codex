import { logger } from "./shared/logger.js";
import { TaskService } from "./module/services/task-service.js";
import { TaskRepository } from "./module/repositories/task-repository.js";

const service = new TaskService(new TaskRepository());
const taskDto = service.listTasks()[0];

logger.info("DTO boundary example", {
  taskDto,
  guidance: "DTOs prevent persistence-only fields from leaking into public responses.",
});
