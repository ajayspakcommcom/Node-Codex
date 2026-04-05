import { MaterializationAdvisor } from "../advisors/materialization-advisor.js";
import { AggregationPipelineRunner, type PipelineStage } from "../engine/pipeline-runner.js";
import type { AggregationDocument, MaterializationAssessment, PipelineRunResult } from "../../shared/aggregation-types.js";

export class ReportingService {
  public constructor(
    private readonly pipelineRunner: AggregationPipelineRunner,
    private readonly materializationAdvisor: MaterializationAdvisor,
  ) {}

  public runReport(
    pipelineName: string,
    input: readonly AggregationDocument[],
    stages: readonly PipelineStage[],
    requestFrequencyPerHour: number,
    freshnessToleranceMinutes: number,
  ): {
    readonly result: PipelineRunResult;
    readonly materializationAssessment: MaterializationAssessment;
  } {
    const result = this.pipelineRunner.run(pipelineName, input, stages);

    return {
      result,
      materializationAssessment: this.materializationAdvisor.assess({
        requestFrequencyPerHour,
        totalCostUnits: result.totalCostUnits,
        freshnessToleranceMinutes,
      }),
    };
  }
}
