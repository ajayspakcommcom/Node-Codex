export interface RegionalRolloutInput {
  targetRegion: string;
  replicationLagSeconds: number;
  maximumReplicationLagSeconds: number;
  compatibilityVerified: boolean;
  controlPlaneUpdated: boolean;
  drainPlanDefined: boolean;
  abortPlanDefined: boolean;
}

export interface RegionalRolloutReview {
  targetRegion: string;
  approved: boolean;
  steps: string[];
  blockingReasons: string[];
}

export function reviewRegionalRollout(input: RegionalRolloutInput): RegionalRolloutReview {
  const blockingReasons: string[] = [];

  if (input.replicationLagSeconds > input.maximumReplicationLagSeconds) {
    blockingReasons.push("replication-lag-exceeds-threshold");
  }
  if (!input.compatibilityVerified) {
    blockingReasons.push("multi-version-compatibility-not-verified");
  }
  if (!input.controlPlaneUpdated) {
    blockingReasons.push("control-plane-routing-update-missing");
  }
  if (!input.drainPlanDefined) {
    blockingReasons.push("drain-plan-missing");
  }
  if (!input.abortPlanDefined) {
    blockingReasons.push("abort-plan-missing");
  }

  return {
    targetRegion: input.targetRegion,
    approved: blockingReasons.length === 0,
    steps: [
      "verify-replication-lag",
      "deploy-compatible-version",
      "update-control-plane-routing",
      "shift-traffic-gradually",
      "drain-previous-region-capacity",
    ],
    blockingReasons,
  };
}
