import type { ProductDto, ProductRow } from "./shared/database-types";
import { FakeDatabase } from "./shared/fake-database";
import { toProductDto } from "./shared/mappers";

class ProductRepository {
  public constructor(private readonly database: FakeDatabase) {}

  public create(product: ProductRow): void {
    this.database.insertProduct(product);
  }

  public findBySku(sku: string): ProductDto | null {
    const product = this.database.getProducts().find((currentProduct) => currentProduct.sku === sku);
    return product ? toProductDto(product) : null;
  }

  public updateInventory(productId: string, inventoryCount: number): void {
    this.database.updateProductInventory(productId, inventoryCount);
  }

  public list(): readonly ProductDto[] {
    return this.database.getProducts().map(toProductDto);
  }
}

const repository = new ProductRepository(new FakeDatabase());

repository.create({
  id: "prod_3",
  sku: "kafka-guide",
  name: "Kafka Operations Guide",
  priceInCents: 7500,
  inventoryCount: 12,
  createdAt: "2026-04-04T09:30:00.000Z",
});

console.log(repository.findBySku("kafka-guide"));
repository.updateInventory("prod_3", 9);
console.log(repository.list());
