import { logger } from "./shared/logger.js";
import { TaskController } from "./module/controllers/task-controller.js";
import { TaskRepository } from "./module/repositories/task-repository.js";
import { TaskService } from "./module/services/task-service.js";

const controller = new TaskController(new TaskService(new TaskRepository()));

const listResponse = controller.list();
const createResponse = controller.create({
  body: {
    title: "Document layered architecture",
  },
});

logger.info("Request flow across layers", {
  listResponse,
  createResponse,
  guidance: "The request moves through controller -> service -> repository -> infrastructure and returns through explicit DTOs.",
});
