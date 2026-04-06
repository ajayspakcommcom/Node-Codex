export interface GuardrailReviewInput {
  serviceName: string;
  idleNodeCount: number;
  hasStorageLifecyclePolicy: boolean;
}

export interface GuardrailReviewResult {
  recommendations: readonly string[];
}

export class GuardrailPolicy {
  public review(input: GuardrailReviewInput): GuardrailReviewResult {
    const recommendations: string[] = [];

    if (input.idleNodeCount > 2) {
      recommendations.push(`reduce idle node count for ${input.serviceName}`);
    }

    if (!input.hasStorageLifecyclePolicy) {
      recommendations.push(`add storage lifecycle policy for ${input.serviceName}`);
    }

    return { recommendations };
  }
}

export function createDefaultGuardrailPolicy(): GuardrailPolicy {
  return new GuardrailPolicy();
}
