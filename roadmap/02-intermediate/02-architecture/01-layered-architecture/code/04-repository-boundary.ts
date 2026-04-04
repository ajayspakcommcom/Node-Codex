import { logger } from "./shared/logger.js";
import { TaskRepository } from "./module/repositories/task-repository.js";

const repository = new TaskRepository();
const records = repository.list();

logger.info("Repository boundary example", {
  firstRecord: records[0],
  guidance: "Repositories isolate persistence access and shield the rest of the application from infrastructure details.",
});
