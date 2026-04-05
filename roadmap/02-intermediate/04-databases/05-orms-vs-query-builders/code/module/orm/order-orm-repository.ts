import { OrderEntityModel } from "./order-entity-model.js";
import type { OrderListFilters, OrderRow } from "../../shared/data-access-types.js";

export class OrderOrmRepository {
  private rows: OrderRow[];

  public constructor(seedRows: readonly OrderRow[]) {
    this.rows = seedRows.map((row) => ({ ...row }));
  }

  public findById(id: string): OrderEntityModel {
    const row = this.rows.find((candidate) => candidate.id === id);

    if (row === undefined) {
      throw new Error(`Order ${id} was not found.`);
    }

    return new OrderEntityModel(row);
  }

  public listTenantOrders(tenantId: string, filters: OrderListFilters): readonly OrderEntityModel[] {
    return this.rows
      .filter((row) => row.tenantId === tenantId)
      .filter((row) => (filters.status === undefined ? true : row.status === filters.status))
      .filter((row) => (filters.channel === undefined ? true : row.channel === filters.channel))
      .filter((row) => (filters.minTotalInCents === undefined ? true : row.totalInCents >= filters.minTotalInCents))
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      .map((row) => new OrderEntityModel(row));
  }

  public save(entity: OrderEntityModel): OrderEntityModel {
    const row = entity.toJSON();
    const index = this.rows.findIndex((candidate) => candidate.id === row.id);

    if (index === -1) {
      this.rows.push(row);
      return new OrderEntityModel(row);
    }

    this.rows[index] = row;
    return new OrderEntityModel(row);
  }

  public generatedQueryPreview(tenantId: string, filters: OrderListFilters): string {
    const conditions = [
      `tenant_id = '${tenantId}'`,
      ...(filters.status === undefined ? [] : [`status = '${filters.status}'`]),
      ...(filters.channel === undefined ? [] : [`channel = '${filters.channel}'`]),
      ...(filters.minTotalInCents === undefined ? [] : [`total_in_cents >= ${filters.minTotalInCents}`]),
    ];

    return `SELECT * FROM orders WHERE ${conditions.join(" AND ")} ORDER BY created_at DESC;`;
  }
}
