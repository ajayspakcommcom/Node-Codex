import { createLogger } from "./shared/logger.js";

const logger = createLogger("stdio-and-exit-codes");

process.stdout.write("stdout: normal structured output channel\n");
process.stderr.write("stderr: error-oriented output channel\n");

logger.info("stdio overview", {
  stdinIsTTY: process.stdin.isTTY ?? false,
  stdoutIsTTY: process.stdout.isTTY ?? false,
  stderrIsTTY: process.stderr.isTTY ?? false,
});

process.exitCode = 0;
logger.info("Exit code prepared for automation", { exitCode: process.exitCode });
