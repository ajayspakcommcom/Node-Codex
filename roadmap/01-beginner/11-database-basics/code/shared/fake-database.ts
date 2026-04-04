import type {
  OrderItemRow,
  OrderRow,
  ProductFilter,
  ProductRow,
  UserRow,
} from "./database-types";

interface DatabaseState {
  users: UserRow[];
  products: ProductRow[];
  orders: OrderRow[];
  orderItems: OrderItemRow[];
}

export class ConstraintViolationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConstraintViolationError";
  }
}

export class FakeDatabase {
  private state: DatabaseState;

  public constructor(seedState?: Partial<DatabaseState>) {
    this.state = {
      users: seedState?.users ?? [
        {
          id: "user_1",
          email: "ajay@example.com",
          name: "Ajay",
          createdAt: "2026-04-04T08:00:00.000Z",
          isActive: true,
        },
      ],
      products: seedState?.products ?? [
        {
          id: "prod_1",
          sku: "node-book",
          name: "Node Architecture Handbook",
          priceInCents: 4500,
          inventoryCount: 30,
          createdAt: "2026-04-04T08:00:00.000Z",
        },
        {
          id: "prod_2",
          sku: "ts-course",
          name: "TypeScript Enterprise Course",
          priceInCents: 9000,
          inventoryCount: 0,
          createdAt: "2026-04-04T08:05:00.000Z",
        },
      ],
      orders: seedState?.orders ?? [],
      orderItems: seedState?.orderItems ?? [],
    };
  }

  public getUsers(): readonly UserRow[] {
    return this.state.users;
  }

  public getProducts(): readonly ProductRow[] {
    return this.state.products;
  }

  public getOrders(): readonly OrderRow[] {
    return this.state.orders;
  }

  public getOrderItems(): readonly OrderItemRow[] {
    return this.state.orderItems;
  }

  public insertUser(user: UserRow): void {
    if (this.state.users.some((existingUser) => existingUser.email === user.email)) {
      throw new ConstraintViolationError("users.email must be unique");
    }

    this.state.users.push(user);
  }

  public insertProduct(product: ProductRow): void {
    if (this.state.products.some((existingProduct) => existingProduct.sku === product.sku)) {
      throw new ConstraintViolationError("products.sku must be unique");
    }

    this.state.products.push(product);
  }

  public updateProductInventory(productId: string, inventoryCount: number): void {
    this.state.products = this.state.products.map((product) =>
      product.id === productId ? { ...product, inventoryCount } : product,
    );
  }

  public listProducts(filter: ProductFilter): readonly ProductRow[] {
    return this.state.products.filter((product) => {
      const matchesStock =
        filter.isInStock === undefined
          ? true
          : filter.isInStock
            ? product.inventoryCount > 0
            : product.inventoryCount === 0;

      const matchesMinPrice =
        filter.minPriceInCents === undefined || product.priceInCents >= filter.minPriceInCents;
      const matchesMaxPrice =
        filter.maxPriceInCents === undefined || product.priceInCents <= filter.maxPriceInCents;
      const matchesSearch =
        filter.search === undefined ||
        product.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        product.sku.toLowerCase().includes(filter.search.toLowerCase());

      return matchesStock && matchesMinPrice && matchesMaxPrice && matchesSearch;
    });
  }

  public insertOrder(order: OrderRow): void {
    const userExists = this.state.users.some((user) => user.id === order.userId);

    if (!userExists) {
      throw new ConstraintViolationError("orders.userId must reference users.id");
    }

    this.state.orders.push(order);
  }

  public insertOrderItem(orderItem: OrderItemRow): void {
    const orderExists = this.state.orders.some((order) => order.id === orderItem.orderId);
    const productExists = this.state.products.some((product) => product.id === orderItem.productId);

    if (!orderExists) {
      throw new ConstraintViolationError("order_items.orderId must reference orders.id");
    }

    if (!productExists) {
      throw new ConstraintViolationError("order_items.productId must reference products.id");
    }

    this.state.orderItems.push(orderItem);
  }

  public transaction<TValue>(callback: (database: FakeDatabase) => TValue): TValue {
    const snapshot = JSON.parse(JSON.stringify(this.state)) as DatabaseState;

    try {
      return callback(this);
    } catch (error) {
      this.state = snapshot;
      throw error;
    }
  }
}
