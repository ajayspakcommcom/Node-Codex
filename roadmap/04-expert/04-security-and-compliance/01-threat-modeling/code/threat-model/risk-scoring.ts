export type RiskLevel = "low" | "medium" | "high";

export interface ThreatScoreInput {
  impact: RiskLevel;
  likelihood: RiskLevel;
}

const numericScore: Record<RiskLevel, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export function scoreThreat(input: ThreatScoreInput): number {
  return numericScore[input.impact] * numericScore[input.likelihood];
}
