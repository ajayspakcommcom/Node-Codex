export type IsolationLevel = "read-committed" | "repeatable-read" | "serializable";

export interface Account {
  readonly id: string;
  readonly balanceInCents: number;
}

export interface InventoryItem {
  readonly sku: string;
  readonly availableUnits: number;
  readonly reservedUnits: number;
}

export interface OrderRecord {
  readonly id: string;
  readonly userId: string;
  readonly sku: string;
  readonly units: number;
  readonly totalInCents: number;
  readonly status: "placed" | "cancelled";
}

export interface OutboxEvent {
  readonly id: string;
  readonly topic: string;
  readonly payload: Record<string, unknown>;
  readonly status: "pending" | "delivered";
}

export interface DatabaseState {
  readonly accounts: Account[];
  readonly inventories: InventoryItem[];
  readonly orders: OrderRecord[];
  readonly outboxEvents: OutboxEvent[];
}

export interface TransactionOptions {
  readonly name: string;
  readonly isolationLevel: IsolationLevel;
  readonly maxRetries?: number;
}

export interface TransactionMetrics {
  readonly name: string;
  readonly isolationLevel: IsolationLevel;
  readonly attempts: number;
  readonly lockUnits: number;
  readonly committed: boolean;
  readonly rolledBack: boolean;
  readonly rollbackReason?: string;
}

export interface TransactionResult<T> {
  readonly value: T;
  readonly metrics: TransactionMetrics;
}

export interface WorkflowStep {
  readonly name: string;
  readonly category:
    | "database-read"
    | "database-write"
    | "payment-gateway"
    | "external-http"
    | "email"
    | "queue-publish"
    | "file-storage"
    | "user-input";
  readonly requiredForAtomicity: boolean;
  readonly estimatedDurationMs: number;
}

export interface IsolationProfile {
  readonly level: IsolationLevel;
  readonly protectsFrom: readonly string[];
  readonly tradeoff: string;
  readonly commonUse: string;
}
