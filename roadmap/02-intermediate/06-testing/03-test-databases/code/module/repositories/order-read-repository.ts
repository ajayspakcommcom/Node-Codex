import type { OrderDocument } from "../../shared/test-db-types.js";
import { TestDatabaseHarness } from "../db/test-database-harness.js";

export class OrderReadRepository {
  public constructor(private readonly harness: TestDatabaseHarness) {}

  public async listByTenant(tenantId: string): Promise<readonly OrderDocument[]> {
    return this.harness.listOrdersByTenant(tenantId);
  }
}
