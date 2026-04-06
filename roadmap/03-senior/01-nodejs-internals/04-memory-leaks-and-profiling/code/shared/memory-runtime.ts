import type { HeapSignal, RetentionSubject } from "./memory-types.js";

export const memoryRuntime = {
  highRetentionThreshold: 100,
  listenerWarningThreshold: 8,
} as const;

export const baselineHeapSignals: readonly HeapSignal[] = [
  {
    usedHeapMb: 120,
    rssMb: 220,
    gcPressure: "low",
  },
  {
    usedHeapMb: 165,
    rssMb: 280,
    gcPressure: "medium",
  },
  {
    usedHeapMb: 240,
    rssMb: 390,
    gcPressure: "high",
  },
] as const;

export const retentionExamples: readonly RetentionSubject[] = [
  {
    name: "bounded-cache",
    retainedObjects: 50,
    growthTrend: "stable",
    bounded: true,
  },
  {
    name: "unbounded-cache",
    retainedObjects: 240,
    growthTrend: "growing",
    bounded: false,
  },
  {
    name: "listener-buildup",
    retainedObjects: 160,
    growthTrend: "growing",
    bounded: false,
  },
] as const;
