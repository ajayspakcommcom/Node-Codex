import type { AggregationDocument, PipelineRunResult, StageMetric } from "../../shared/aggregation-types.js";

interface StageExecution {
  readonly output: readonly AggregationDocument[];
  readonly note: string;
  readonly costMultiplier: number;
}

export interface PipelineStage {
  readonly name: string;
  readonly kind: string;
  readonly apply: (input: readonly AggregationDocument[]) => StageExecution;
}

function averageFieldCount(documents: readonly AggregationDocument[]): number {
  if (documents.length === 0) {
    return 0;
  }

  const totalFields = documents.reduce((sum, document) => sum + Object.keys(document).length, 0);
  return Number((totalFields / documents.length).toFixed(2));
}

export class AggregationPipelineRunner {
  public run(
    pipelineName: string,
    input: readonly AggregationDocument[],
    stages: readonly PipelineStage[],
  ): PipelineRunResult {
    let currentDocuments = input.map((document) => ({ ...document }));
    const stageMetrics: StageMetric[] = [];

    for (const stage of stages) {
      const inputCount = currentDocuments.length;
      const execution = stage.apply(currentDocuments);
      const outputCount = execution.output.length;
      const averageOutputFieldCount = averageFieldCount(execution.output);
      const estimatedCostUnits = Math.max(
        1,
        Math.round((inputCount + outputCount + averageOutputFieldCount) * execution.costMultiplier),
      );

      stageMetrics.push({
        name: stage.name,
        kind: stage.kind,
        inputCount,
        outputCount,
        averageOutputFieldCount,
        estimatedCostUnits,
        note: execution.note,
      });

      currentDocuments = execution.output.map((document) => ({ ...document }));
    }

    return {
      pipelineName,
      output: currentDocuments,
      stageMetrics,
      totalCostUnits: stageMetrics.reduce((sum, metric) => sum + metric.estimatedCostUnits, 0),
    };
  }
}

export function filterStage(
  name: string,
  predicate: (document: AggregationDocument) => boolean,
  note: string,
): PipelineStage {
  return {
    name,
    kind: "filter",
    apply(input) {
      return {
        output: input.filter(predicate),
        note,
        costMultiplier: 1,
      };
    },
  };
}

export function projectStage(name: string, fields: readonly string[], note: string): PipelineStage {
  return {
    name,
    kind: "project",
    apply(input) {
      return {
        output: input.map((document) => {
          const projected: Record<string, unknown> = {};

          for (const field of fields) {
            projected[field] = document[field];
          }

          return projected;
        }),
        note,
        costMultiplier: 0.8,
      };
    },
  };
}

export function groupStage(
  name: string,
  keySelector: (document: AggregationDocument) => string,
  aggregator: (key: string, documents: readonly AggregationDocument[]) => AggregationDocument,
  note: string,
): PipelineStage {
  return {
    name,
    kind: "group",
    apply(input) {
      const groups = new Map<string, AggregationDocument[]>();

      for (const document of input) {
        const key = keySelector(document);
        const existing = groups.get(key);

        if (existing === undefined) {
          groups.set(key, [document]);
          continue;
        }

        existing.push(document);
      }

      return {
        output: [...groups.entries()].map(([key, documents]) => aggregator(key, documents)),
        note,
        costMultiplier: 1.4,
      };
    },
  };
}

export function sortStage(
  name: string,
  compare: (left: AggregationDocument, right: AggregationDocument) => number,
  note: string,
): PipelineStage {
  return {
    name,
    kind: "sort",
    apply(input) {
      return {
        output: [...input].sort(compare),
        note,
        costMultiplier: 1.6,
      };
    },
  };
}

export function paginateStage(name: string, offset: number, limit: number, note: string): PipelineStage {
  return {
    name,
    kind: "paginate",
    apply(input) {
      return {
        output: input.slice(offset, offset + limit),
        note,
        costMultiplier: 0.6,
      };
    },
  };
}

export function lookupStage(
  name: string,
  foreignDocuments: readonly AggregationDocument[],
  localField: string,
  foreignField: string,
  asField: string,
  note: string,
): PipelineStage {
  return {
    name,
    kind: "lookup",
    apply(input) {
      const output = input.map((document) => {
        const matches = foreignDocuments.filter((foreignDocument) => foreignDocument[foreignField] === document[localField]);

        return {
          ...document,
          [asField]: matches,
        };
      });

      return {
        output,
        note,
        costMultiplier: 2,
      };
    },
  };
}

export function unwindStage(name: string, field: string, note: string): PipelineStage {
  return {
    name,
    kind: "unwind",
    apply(input) {
      const output: AggregationDocument[] = [];

      for (const document of input) {
        const values = document[field];

        if (!Array.isArray(values) || values.length === 0) {
          output.push({ ...document });
          continue;
        }

        for (const value of values) {
          output.push({
            ...document,
            [field]: value,
          });
        }
      }

      return {
        output,
        note,
        costMultiplier: 1.8,
      };
    },
  };
}

export function topCostStages(stageMetrics: readonly StageMetric[], limit: number): readonly StageMetric[] {
  return [...stageMetrics]
    .sort((left, right) => right.estimatedCostUnits - left.estimatedCostUnits)
    .slice(0, limit);
}
