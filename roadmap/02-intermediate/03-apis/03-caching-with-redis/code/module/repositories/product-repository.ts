import type { ProductDto, ProductRecord, RepositoryMetricsSnapshot } from "../../shared/cache-types.js";
import { sleep } from "../../shared/cache-runtime.js";

export class ProductRepository {
  private readonly records: ProductRecord[] = [
    {
      id: "prd_1001",
      tenantId: "tenant_alpha",
      name: "Enterprise Notebook",
      priceInCents: 129900,
      inventory: 12,
      updatedAt: "2026-04-01T09:00:00.000Z",
    },
    {
      id: "prd_1002",
      tenantId: "tenant_alpha",
      name: "Standing Desk",
      priceInCents: 549900,
      inventory: 4,
      updatedAt: "2026-04-01T11:30:00.000Z",
    },
    {
      id: "prd_2001",
      tenantId: "tenant_beta",
      name: "Conference Camera",
      priceInCents: 249900,
      inventory: 7,
      updatedAt: "2026-04-02T14:15:00.000Z",
    },
  ];

  private findByIdCalls = 0;
  private listCalls = 0;
  private updateCalls = 0;

  public async findById(tenantId: string, productId: string): Promise<ProductRecord | undefined> {
    this.findByIdCalls += 1;
    await sleep(15);
    return this.records.find((record) => record.tenantId === tenantId && record.id === productId);
  }

  public async listByTenant(tenantId: string): Promise<readonly ProductRecord[]> {
    this.listCalls += 1;
    await sleep(15);
    return this.records.filter((record) => record.tenantId === tenantId);
  }

  public async updatePrice(tenantId: string, productId: string, priceInCents: number): Promise<ProductRecord> {
    this.updateCalls += 1;
    await sleep(10);

    const record = this.records.find((candidate) => candidate.tenantId === tenantId && candidate.id === productId);

    if (record === undefined) {
      throw new Error("Product not found.");
    }

    const nextRecord: ProductRecord = {
      ...record,
      priceInCents,
      updatedAt: new Date().toISOString(),
    };

    const recordIndex = this.records.indexOf(record);
    this.records[recordIndex] = nextRecord;
    return nextRecord;
  }

  public snapshotMetrics(): RepositoryMetricsSnapshot {
    return {
      findByIdCalls: this.findByIdCalls,
      listCalls: this.listCalls,
      updateCalls: this.updateCalls,
    };
  }
}

export function toProductDto(record: ProductRecord): ProductDto {
  return {
    id: record.id,
    tenantId: record.tenantId,
    name: record.name,
    priceInCents: record.priceInCents,
    inventory: record.inventory,
    updatedAt: record.updatedAt,
  };
}
