export interface EvidenceRecordInput {
  controlId: string;
  source: string;
}

export interface EvidenceRecord {
  controlId: string;
  source: string;
  status: "recorded";
}

export class EvidenceRecorder {
  public record(input: EvidenceRecordInput): EvidenceRecord {
    return {
      controlId: input.controlId,
      source: input.source,
      status: "recorded",
    };
  }
}

export function createEvidenceRecorder(): EvidenceRecorder {
  return new EvidenceRecorder();
}
