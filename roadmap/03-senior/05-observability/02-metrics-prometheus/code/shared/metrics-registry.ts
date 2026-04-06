type Labels = Record<string, string>;

interface CounterMetric {
  inc(labels?: Labels, value?: number): void;
}

interface GaugeMetric {
  set(labels: Labels, value: number): void;
}

interface HistogramMetric {
  observe(labels: Labels, value: number): void;
}

interface MetricRecord {
  readonly name: string;
  readonly help: string;
  readonly type: "counter" | "gauge" | "histogram";
  readonly labels: Labels;
  readonly value: number;
}

export class MetricsRegistry {
  private readonly records: MetricRecord[] = [];

  counter(name: string, help: string): CounterMetric {
    return {
      inc: (labels: Labels = {}, value = 1): void => {
        this.records.push({ name, help, type: "counter", labels, value });
      },
    };
  }

  gauge(name: string, help: string): GaugeMetric {
    return {
      set: (labels: Labels, value: number): void => {
        this.records.push({ name, help, type: "gauge", labels, value });
      },
    };
  }

  histogram(name: string, help: string): HistogramMetric {
    return {
      observe: (labels: Labels, value: number): void => {
        this.records.push({ name, help, type: "histogram", labels, value });
      },
    };
  }

  render(): string {
    return this.records
      .map((record) => {
        const labelString = Object.entries(record.labels)
          .map(([key, value]) => `${key}="${value}"`)
          .join(",");

        const labels = labelString ? `{${labelString}}` : "";

        return [
          `# HELP ${record.name} ${record.help}`,
          `# TYPE ${record.name} ${record.type}`,
          `${record.name}${labels} ${record.value}`,
        ].join("\n");
      })
      .join("\n");
  }
}
