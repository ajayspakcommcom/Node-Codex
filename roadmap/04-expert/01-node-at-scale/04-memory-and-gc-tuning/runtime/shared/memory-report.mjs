export function captureMemoryReport(name, extra = {}) {
  const usage = process.memoryUsage();

  return {
    scenario: name,
    rss: usage.rss,
    heapTotal: usage.heapTotal,
    heapUsed: usage.heapUsed,
    external: usage.external,
    arrayBuffers: usage.arrayBuffers,
    ...extra,
  };
}

export function printMemoryReport(name, extra = {}) {
  console.log(JSON.stringify(captureMemoryReport(name, extra)));
}
