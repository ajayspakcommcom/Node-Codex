import { logger } from "./shared/logger.js";
import { TaskController } from "./module/controllers/task-controller.js";
import { TaskRepository } from "./module/repositories/task-repository.js";
import { TaskService } from "./module/services/task-service.js";

const controller = new TaskController(new TaskService(new TaskRepository()));

const response = controller.create({
  body: {
    title: "Thin controller example",
  },
});

logger.info("Thin controller example", {
  response,
  guidance: "The controller delegates business rules to the service layer instead of implementing them directly.",
});
