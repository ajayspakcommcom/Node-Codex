import { CatalogService } from "../services/catalog-service.js";

export class CatalogController {
  public constructor(private readonly catalogService: CatalogService) {}

  public async getProduct(input: {
    readonly tenantId: string;
    readonly productId: string;
    readonly nowEpochSeconds: number;
  }): Promise<{
    readonly statusCode: number;
    readonly body: unknown;
  }> {
    return {
      statusCode: 200,
      body: await this.catalogService.getProduct(input),
    };
  }

  public async getCatalog(input: {
    readonly tenantId: string;
    readonly nowEpochSeconds: number;
  }): Promise<{
    readonly statusCode: number;
    readonly body: unknown;
  }> {
    return {
      statusCode: 200,
      body: await this.catalogService.getCatalog(input),
    };
  }

  public async updatePrice(input: {
    readonly tenantId: string;
    readonly productId: string;
    readonly priceInCents: number;
    readonly nowEpochSeconds: number;
  }): Promise<{
    readonly statusCode: number;
    readonly body: unknown;
  }> {
    return {
      statusCode: 200,
      body: await this.catalogService.updatePrice(input),
    };
  }

  public metrics() {
    return this.catalogService.metricsSnapshot();
  }
}
