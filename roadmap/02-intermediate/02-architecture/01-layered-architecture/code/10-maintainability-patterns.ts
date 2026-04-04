import { logger } from "./shared/logger.js";
import { TaskController } from "./module/controllers/task-controller.js";
import { TaskRepository } from "./module/repositories/task-repository.js";
import { TaskService } from "./module/services/task-service.js";

class TaskModule {
  public readonly repository = new TaskRepository();
  public readonly service = new TaskService(this.repository);
  public readonly controller = new TaskController(this.service);
}

const module = new TaskModule();
const response = module.controller.list();

logger.info("Maintainable layered module example", {
  response,
  rule: "Keep module wiring explicit so each layer is easy to replace, test, and review.",
});
