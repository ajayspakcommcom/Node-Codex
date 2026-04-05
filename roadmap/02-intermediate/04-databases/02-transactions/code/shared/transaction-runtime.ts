import type { DatabaseState, IsolationProfile, WorkflowStep } from "./transaction-types.js";

export function createSeedState(): DatabaseState {
  return {
    accounts: [
      {
        id: "acct_buyer_1",
        balanceInCents: 250_000,
      },
      {
        id: "acct_seller_settlement",
        balanceInCents: 0,
      },
      {
        id: "acct_ops_reserve",
        balanceInCents: 500_000,
      },
    ],
    inventories: [
      {
        sku: "laptop-pro",
        availableUnits: 6,
        reservedUnits: 0,
      },
      {
        sku: "headphones-studio",
        availableUnits: 25,
        reservedUnits: 0,
      },
    ],
    orders: [],
    outboxEvents: [],
  };
}

export function cloneState(state: DatabaseState): DatabaseState {
  return JSON.parse(JSON.stringify(state)) as DatabaseState;
}

export const checkoutWorkflowSteps: readonly WorkflowStep[] = [
  {
    name: "Load buyer account",
    category: "database-read",
    requiredForAtomicity: true,
    estimatedDurationMs: 15,
  },
  {
    name: "Debit buyer account",
    category: "database-write",
    requiredForAtomicity: true,
    estimatedDurationMs: 20,
  },
  {
    name: "Reserve inventory",
    category: "database-write",
    requiredForAtomicity: true,
    estimatedDurationMs: 20,
  },
  {
    name: "Persist order",
    category: "database-write",
    requiredForAtomicity: true,
    estimatedDurationMs: 25,
  },
  {
    name: "Call payment gateway",
    category: "payment-gateway",
    requiredForAtomicity: false,
    estimatedDurationMs: 900,
  },
  {
    name: "Publish fulfillment event",
    category: "queue-publish",
    requiredForAtomicity: false,
    estimatedDurationMs: 120,
  },
  {
    name: "Send confirmation email",
    category: "email",
    requiredForAtomicity: false,
    estimatedDurationMs: 200,
  },
];

export const invoiceWorkflowSteps: readonly WorkflowStep[] = [
  {
    name: "Create invoice row",
    category: "database-write",
    requiredForAtomicity: true,
    estimatedDurationMs: 15,
  },
  {
    name: "Store PDF in object storage",
    category: "file-storage",
    requiredForAtomicity: false,
    estimatedDurationMs: 1_400,
  },
  {
    name: "Notify billing service",
    category: "external-http",
    requiredForAtomicity: false,
    estimatedDurationMs: 350,
  },
];

export const isolationProfiles: readonly IsolationProfile[] = [
  {
    level: "read-committed",
    protectsFrom: ["dirty reads"],
    tradeoff: "Lower coordination cost, but repeated reads may still observe change.",
    commonUse: "General CRUD workflows where strict repeatability is not required.",
  },
  {
    level: "repeatable-read",
    protectsFrom: ["dirty reads", "non-repeatable reads"],
    tradeoff: "Stronger read stability, but more locking or retained snapshots.",
    commonUse: "Financial or inventory workflows that reread the same records.",
  },
  {
    level: "serializable",
    protectsFrom: ["dirty reads", "non-repeatable reads", "many write skew scenarios"],
    tradeoff: "Highest consistency, but usually the most coordination and retry pressure.",
    commonUse: "Critical workflows where concurrent anomalies would violate core invariants.",
  },
];
