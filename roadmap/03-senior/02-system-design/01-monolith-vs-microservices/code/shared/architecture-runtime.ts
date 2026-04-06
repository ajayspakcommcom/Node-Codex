import {
  DependencyEdge,
  DomainModule,
  OperationalProfile,
  ServiceBoundaryCandidate,
} from "./architecture-types.js";

export const commerceModules: DomainModule[] = [
  {
    name: "catalog",
    ownedBy: "commerce-core",
    independentReleasePressure: "medium",
    scalingNeed: "shared",
    changesPerMonth: 10,
    sharesTransactionalDataWith: [],
  },
  {
    name: "checkout",
    ownedBy: "commerce-core",
    independentReleasePressure: "high",
    scalingNeed: "separate",
    changesPerMonth: 18,
    sharesTransactionalDataWith: ["payments", "inventory"],
  },
  {
    name: "payments",
    ownedBy: "payments-platform",
    independentReleasePressure: "high",
    scalingNeed: "separate",
    changesPerMonth: 14,
    sharesTransactionalDataWith: ["checkout"],
  },
  {
    name: "inventory",
    ownedBy: "operations-platform",
    independentReleasePressure: "medium",
    scalingNeed: "separate",
    changesPerMonth: 12,
    sharesTransactionalDataWith: ["checkout"],
  },
];

export const commerceDependencies: DependencyEdge[] = [
  { from: "checkout", to: "payments", callType: "sync-http", criticalPath: true },
  { from: "checkout", to: "inventory", callType: "sync-http", criticalPath: true },
  { from: "catalog", to: "inventory", callType: "async-event", criticalPath: false },
];

export const candidateBoundaries: ServiceBoundaryCandidate[] = [
  {
    name: "checkout",
    responsibilities: ["cart pricing", "order submission", "reserve inventory"],
    ownedByTeams: ["commerce-core"],
    synchronousDependencies: ["payments", "inventory"],
    sharedDataTouches: ["orders", "payment authorizations", "stock reservations"],
    requestVolumeShare: 0.32,
  },
  {
    name: "payments",
    responsibilities: ["authorize payments", "capture funds", "refunds"],
    ownedByTeams: ["payments-platform"],
    synchronousDependencies: [],
    sharedDataTouches: ["payment authorizations", "refund state"],
    requestVolumeShare: 0.11,
  },
  {
    name: "catalog",
    responsibilities: ["product reads", "pricing reads", "search filters"],
    ownedByTeams: ["commerce-core"],
    synchronousDependencies: [],
    sharedDataTouches: ["products", "categories"],
    requestVolumeShare: 0.57,
  },
];

export const monolithProfile: OperationalProfile = {
  deploymentsPerMonth: 25,
  onCallSurfaces: 1,
  incidentDebugCost: "medium",
  contractCount: 0,
};

export const microserviceProfile: OperationalProfile = {
  deploymentsPerMonth: 90,
  onCallSurfaces: 5,
  incidentDebugCost: "high",
  contractCount: 12,
};
