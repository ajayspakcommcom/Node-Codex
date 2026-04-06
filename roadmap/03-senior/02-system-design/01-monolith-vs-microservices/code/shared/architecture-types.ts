export type ArchitectureStyle = "modular-monolith" | "microservices";

export interface DomainModule {
  name: string;
  ownedBy: string;
  independentReleasePressure: "low" | "medium" | "high";
  scalingNeed: "shared" | "separate";
  changesPerMonth: number;
  sharesTransactionalDataWith: string[];
}

export interface ServiceBoundaryCandidate {
  name: string;
  responsibilities: string[];
  ownedByTeams: string[];
  synchronousDependencies: string[];
  sharedDataTouches: string[];
  requestVolumeShare: number;
}

export interface ArchitectureScorecard {
  architecture: ArchitectureStyle;
  strengths: string[];
  risks: string[];
  recommendation: string;
}

export interface DependencyEdge {
  from: string;
  to: string;
  callType: "sync-http" | "async-event" | "shared-transaction";
  criticalPath: boolean;
}

export interface OperationalProfile {
  deploymentsPerMonth: number;
  onCallSurfaces: number;
  incidentDebugCost: "low" | "medium" | "high";
  contractCount: number;
}

export interface ExtractionDecision {
  candidate: string;
  recommendedArchitecture: ArchitectureStyle;
  reasons: string[];
}
