type ProcessRef = typeof process;

export function getRuntimeSummary(): {
  readonly nodeVersion: string;
  readonly platform: string;
  readonly pid: number;
  readonly cwd: string;
} {
  return {
    nodeVersion: process.version,
    platform: process.platform,
    pid: process.pid,
    cwd: process.cwd(),
  };
}

export function setFailureExitCode(): void {
  process.exitCode = 1;
}

export function getProcessRef(): ProcessRef {
  return process;
}
