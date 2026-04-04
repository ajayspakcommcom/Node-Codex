import type { ProductDto, ProductRow } from "./database-types";

export function toProductDto(product: ProductRow): ProductDto {
  return {
    id: product.id,
    sku: product.sku,
    name: product.name,
    priceInCents: product.priceInCents,
    inStock: product.inventoryCount > 0,
  };
}
