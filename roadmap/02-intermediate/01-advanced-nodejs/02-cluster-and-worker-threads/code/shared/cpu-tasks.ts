export interface ReportJobInput {
  readonly iterations: number;
  readonly label: string;
}

export interface ReportJobResult {
  readonly label: string;
  readonly checksum: number;
}

export function runCpuHeavyReport(input: ReportJobInput): ReportJobResult {
  let checksum = 0;

  for (let index = 0; index < input.iterations; index += 1) {
    checksum += Math.sqrt(index % 10_000) * Math.sin(index);
  }

  return {
    label: input.label,
    checksum: Number(checksum.toFixed(2)),
  };
}
