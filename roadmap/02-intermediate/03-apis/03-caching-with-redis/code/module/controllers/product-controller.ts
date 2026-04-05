import type { ProductService } from "../services/product-service.js";
import type { ProductDto } from "../../shared/cache-types.js";

interface ProductRequest {
  readonly params: {
    readonly tenantId: string;
    readonly productId?: string;
  };
  readonly body?: {
    readonly priceInCents?: number;
  };
}

interface ProductResponse {
  readonly statusCode: number;
  readonly body: unknown;
}

export class ProductController {
  public constructor(private readonly productService: ProductService) {}

  public async getProduct(request: ProductRequest): Promise<ProductResponse> {
    return {
      statusCode: 200,
      body: await this.productService.getProduct(request.params.tenantId, String(request.params.productId ?? "")),
    };
  }

  public async listCatalog(request: ProductRequest): Promise<ProductResponse> {
    return {
      statusCode: 200,
      body: await this.productService.getCatalog(request.params.tenantId),
    };
  }

  public async updatePrice(request: ProductRequest): Promise<ProductResponse> {
    return {
      statusCode: 200,
      body: await this.productService.updatePrice(
        request.params.tenantId,
        String(request.params.productId ?? ""),
        Number(request.body?.priceInCents ?? 0),
      ),
    };
  }
}
