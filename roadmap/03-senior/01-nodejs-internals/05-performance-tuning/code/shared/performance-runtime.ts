export const performanceRuntime = {
  baselineCpuMs: 18,
  baselineDependencyMs: 42,
  baselineSerializationMs: 6,
  sampleRequestLatenciesMs: [42, 39, 45, 41, 40, 44, 43, 95, 110, 47],
  fastPathLatenciesMs: [18, 19, 17, 20, 18, 17, 21, 19],
  throughputWindowRequests: 400,
} as const;

export function percentile(samplesMs: readonly number[], percentileValue: number): number {
  const ordered = [...samplesMs].sort((left, right) => left - right);
  const index = Math.min(ordered.length - 1, Math.max(0, Math.ceil((percentileValue / 100) * ordered.length) - 1));
  return ordered[index] ?? 0;
}
