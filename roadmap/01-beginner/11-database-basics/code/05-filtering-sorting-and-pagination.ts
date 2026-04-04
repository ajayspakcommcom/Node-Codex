import type { PaginatedResult, PaginationInput, ProductDto, ProductFilter } from "./shared/database-types";
import { FakeDatabase } from "./shared/fake-database";
import { toProductDto } from "./shared/mappers";

function listProducts(
  database: FakeDatabase,
  filter: ProductFilter,
  pagination: PaginationInput,
): PaginatedResult<ProductDto> {
  const approvedPageSize = Math.min(pagination.pageSize, 50);
  const page = Math.max(pagination.page, 1);
  const filteredProducts = [...database.listProducts(filter)].sort(
    (leftProduct, rightProduct) => leftProduct.priceInCents - rightProduct.priceInCents,
  );
  const startIndex = (page - 1) * approvedPageSize;
  const items = filteredProducts.slice(startIndex, startIndex + approvedPageSize).map(toProductDto);

  return {
    items,
    page,
    pageSize: approvedPageSize,
    totalCount: filteredProducts.length,
  };
}

const result = listProducts(
  new FakeDatabase(),
  { isInStock: true, minPriceInCents: 4000 },
  { page: 1, pageSize: 25 },
);

console.log(result);
console.log("Enterprise rule: paginate list endpoints and whitelist supported filters.");
