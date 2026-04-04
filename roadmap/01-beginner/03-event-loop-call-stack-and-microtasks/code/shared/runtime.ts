type ProcessLike = {
  nextTick?: (callback: () => void) => void;
};

type GlobalWithProcess = typeof globalThis & {
  process?: ProcessLike;
  setImmediate?: (callback: () => void) => unknown;
};

const runtime = globalThis as GlobalWithProcess;

export function scheduleNextTick(callback: () => void): void {
  runtime.process?.nextTick?.(callback);
}

export function scheduleImmediate(callback: () => void): void {
  runtime.setImmediate?.(callback);
}
