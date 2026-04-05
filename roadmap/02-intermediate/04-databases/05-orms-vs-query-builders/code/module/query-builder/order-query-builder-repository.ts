import { OrderQueryBuilder } from "./order-query-builder.js";
import type { CustomerRow, ReportingRow, OrderRow } from "../../shared/data-access-types.js";

export class OrderQueryBuilderRepository {
  public constructor(
    private readonly orderRows: readonly OrderRow[],
    private readonly customerRows: readonly CustomerRow[],
  ) {}

  public revenueByChannelForTenant(tenantId: string): {
    readonly rows: readonly ReportingRow[];
    readonly sql: string;
  } {
    const sql = new OrderQueryBuilder()
      .select("orders.channel", "COUNT(*) AS order_count", "SUM(orders.total_in_cents) AS revenue_in_cents")
      .where(`orders.tenant_id = '${tenantId}'`)
      .where("orders.status = 'placed'")
      .groupBy("orders.channel")
      .orderBy("revenue_in_cents DESC")
      .toSQL();

    const rows = this.orderRows
      .filter((row) => row.tenantId === tenantId && row.status === "placed")
      .reduce<Map<string, ReportingRow>>((groups, row) => {
        const current = groups.get(row.channel);

        if (current === undefined) {
          groups.set(row.channel, {
            channel: row.channel,
            orderCount: 1,
            revenueInCents: row.totalInCents,
          });
          return groups;
        }

        groups.set(row.channel, {
          channel: row.channel,
          orderCount: current.orderCount + 1,
          revenueInCents: current.revenueInCents + row.totalInCents,
        });
        return groups;
      }, new Map<string, ReportingRow>());

    return {
      rows: [...rows.values()].sort((left, right) => right.revenueInCents - left.revenueInCents),
      sql,
    };
  }

  public highValueEnterpriseCustomers(tenantId: string, minimumRevenueInCents: number): {
    readonly rows: readonly { customerId: string; segment: string; revenueInCents: number }[];
    readonly sql: string;
  } {
    const sql = new OrderQueryBuilder()
      .select("orders.customer_id", "customers.segment", "SUM(orders.total_in_cents) AS revenue_in_cents")
      .join("INNER JOIN customers ON customers.id = orders.customer_id")
      .where(`orders.tenant_id = '${tenantId}'`)
      .where("orders.status = 'placed'")
      .where(`orders.total_in_cents >= ${minimumRevenueInCents}`)
      .where("customers.segment = 'enterprise'")
      .groupBy("orders.customer_id, customers.segment")
      .orderBy("revenue_in_cents DESC")
      .toSQL();

    const enterpriseCustomers = new Set(
      this.customerRows
        .filter((customer) => customer.tenantId === tenantId && customer.segment === "enterprise")
        .map((customer) => customer.id),
    );

    const grouped = this.orderRows
      .filter((row) => row.tenantId === tenantId && row.status === "placed" && row.totalInCents >= minimumRevenueInCents)
      .filter((row) => enterpriseCustomers.has(row.customerId))
      .reduce<Map<string, { customerId: string; segment: string; revenueInCents: number }>>((groups, row) => {
        const current = groups.get(row.customerId);

        if (current === undefined) {
          groups.set(row.customerId, {
            customerId: row.customerId,
            segment: "enterprise",
            revenueInCents: row.totalInCents,
          });
          return groups;
        }

        groups.set(row.customerId, {
          ...current,
          revenueInCents: current.revenueInCents + row.totalInCents,
        });
        return groups;
      }, new Map());

    return {
      rows: [...grouped.values()].sort((left, right) => right.revenueInCents - left.revenueInCents),
      sql,
    };
  }
}
