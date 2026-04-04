import type { ProductDto, ProductRow } from "./shared/database-types";
import { FakeDatabase } from "./shared/fake-database";
import { toProductDto } from "./shared/mappers";

class ProductReadService {
  public constructor(private readonly database: FakeDatabase) {}

  public listCatalog(): readonly ProductDto[] {
    return this.database
      .getProducts()
      .filter((product) => product.inventoryCount > 0)
      .sort((leftProduct, rightProduct) => leftProduct.name.localeCompare(rightProduct.name))
      .map(toProductDto);
  }
}

class ProductWriteService {
  public constructor(private readonly database: FakeDatabase) {}

  public createCatalogProduct(product: ProductRow): void {
    this.database.insertProduct(product);
  }
}

const database = new FakeDatabase();
const readService = new ProductReadService(database);
const writeService = new ProductWriteService(database);

writeService.createCatalogProduct({
  id: "prod_3",
  sku: "observability-kit",
  name: "Observability Starter Kit",
  priceInCents: 6500,
  inventoryCount: 7,
  createdAt: "2026-04-04T11:00:00.000Z",
});

console.log(readService.listCatalog());
console.log("Enterprise rule: keep reads, writes, mapping, and transport concerns separated.");
