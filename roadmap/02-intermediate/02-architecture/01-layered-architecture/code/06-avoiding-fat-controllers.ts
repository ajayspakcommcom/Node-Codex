import { logger } from "./shared/logger.js";

const fatControllerExample = `
async function createTask(req, res) {
  if (!req.body.title || req.body.title.length < 3) {
    return res.status(400).json({ message: "Invalid title" });
  }

  const task = await db.tasks.insert({
    title: req.body.title.trim(),
    status: "todo",
    createdAt: new Date().toISOString()
  });

  auditClient.track("task-created", task);
  return res.status(201).json(task);
}
`;

logger.warn("Fat controller anti-pattern", {
  codeShape: fatControllerExample,
  guidance: "Controllers should not combine validation, persistence, side effects, and response shaping into one transport handler.",
});
