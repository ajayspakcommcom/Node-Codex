export interface OutcomeInput {
  hypothesisConfirmed: boolean;
  resilienceGap: string | null;
}

export interface OutcomeSummary {
  requiresFollowUp: boolean;
  resilienceGap: string | null;
}

export function summarizeExperimentOutcome(input: OutcomeInput): OutcomeSummary {
  return {
    requiresFollowUp: !input.hypothesisConfirmed,
    resilienceGap: input.resilienceGap,
  };
}
