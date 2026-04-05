export interface OrderRow {
  readonly id: string;
  readonly tenantId: string;
  readonly customerId: string;
  readonly status: "draft" | "placed" | "cancelled" | "refunded";
  readonly channel: "web" | "mobile" | "partner";
  readonly region: "IN" | "US" | "EU";
  readonly totalInCents: number;
  readonly createdAt: string;
}

export interface CustomerRow {
  readonly id: string;
  readonly tenantId: string;
  readonly segment: "standard" | "gold" | "enterprise";
}

export interface OrderListFilters {
  readonly status?: OrderRow["status"];
  readonly channel?: OrderRow["channel"];
  readonly minTotalInCents?: number;
}

export interface ReportingRow {
  readonly channel: string;
  readonly orderCount: number;
  readonly revenueInCents: number;
}

export interface QueryInspection {
  readonly abstraction: "orm" | "query-builder";
  readonly queryShape: string;
  readonly strengths: readonly string[];
  readonly risks: readonly string[];
}
