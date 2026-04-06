import { scoreThreat, type RiskLevel } from "./risk-scoring.js";

export interface Asset {
  name: string;
  sensitivity: "internal" | "regulated";
}

export interface TrustBoundary {
  name: string;
  from: string;
  to: string;
}

export interface ThreatScenario {
  id: string;
  title: string;
  impact: RiskLevel;
  likelihood: RiskLevel;
  mitigationOwner: string;
  mitigation: string;
}

export class ThreatModel {
  public constructor(
    private readonly assetList: readonly Asset[],
    private readonly boundaryList: readonly TrustBoundary[],
    private readonly scenarioList: readonly ThreatScenario[],
  ) {}

  public assets(): readonly Asset[] {
    return this.assetList;
  }

  public boundaries(): readonly TrustBoundary[] {
    return this.boundaryList;
  }

  public scenarios(): readonly ThreatScenario[] {
    return this.scenarioList;
  }

  public highRiskMitigations(): readonly { scenarioId: string; score: number; mitigationOwner: string }[] {
    return this.scenarioList
      .map((scenario) => ({
        scenarioId: scenario.id,
        score: scoreThreat({
          impact: scenario.impact,
          likelihood: scenario.likelihood,
        }),
        mitigationOwner: scenario.mitigationOwner,
      }))
      .filter((scenario) => scenario.score >= 6);
  }
}

export function createDefaultThreatModel(): ThreatModel {
  return new ThreatModel(
    [
      {
        name: "customer-payment-data",
        sensitivity: "regulated",
      },
      {
        name: "order-workflow-events",
        sensitivity: "internal",
      },
    ],
    [
      {
        name: "internet-to-api-gateway",
        from: "public-client",
        to: "api-gateway",
      },
      {
        name: "api-to-orders-service",
        from: "api-gateway",
        to: "orders-service",
      },
      {
        name: "orders-to-payments",
        from: "orders-service",
        to: "payments-service",
      },
    ],
    [
      {
        id: "tm-001",
        title: "forged internal event triggers unauthorized payment capture",
        impact: "high",
        likelihood: "medium",
        mitigationOwner: "payments-platform",
        mitigation: "sign internal events and verify producer identity before capture",
      },
      {
        id: "tm-002",
        title: "public API abuse overwhelms order creation path",
        impact: "medium",
        likelihood: "high",
        mitigationOwner: "edge-platform",
        mitigation: "rate limits and admission control at the gateway",
      },
      {
        id: "tm-003",
        title: "service credential reuse expands blast radius across payment systems",
        impact: "high",
        likelihood: "high",
        mitigationOwner: "platform-security",
        mitigation: "short-lived workload identity and service-to-service authorization policy",
      },
    ],
  );
}
