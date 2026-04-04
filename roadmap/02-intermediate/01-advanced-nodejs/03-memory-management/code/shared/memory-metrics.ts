export interface MemorySnapshot {
  readonly rss: number;
  readonly heapTotal: number;
  readonly heapUsed: number;
  readonly external: number;
  readonly arrayBuffers: number;
}

export function getMemorySnapshot(): MemorySnapshot {
  const usage = process.memoryUsage();

  return {
    rss: usage.rss,
    heapTotal: usage.heapTotal,
    heapUsed: usage.heapUsed,
    external: usage.external,
    arrayBuffers: usage.arrayBuffers,
  };
}

export function formatBytes(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function summarizeMemory(snapshot: MemorySnapshot): Record<string, string> {
  return {
    rss: formatBytes(snapshot.rss),
    heapTotal: formatBytes(snapshot.heapTotal),
    heapUsed: formatBytes(snapshot.heapUsed),
    external: formatBytes(snapshot.external),
    arrayBuffers: formatBytes(snapshot.arrayBuffers),
  };
}
