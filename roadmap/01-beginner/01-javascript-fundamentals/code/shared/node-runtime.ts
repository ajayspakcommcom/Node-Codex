export type ProcessRef = {
  version?: string;
  platform?: string;
  exitCode?: number;
};

type GlobalWithProcess = typeof globalThis & {
  process?: ProcessRef;
};

export const processRef: ProcessRef | undefined = (globalThis as GlobalWithProcess).process;

export function setFailureExitCode(): void {
  if (processRef) {
    processRef.exitCode = 1;
  }
}
