interface QueryPattern {
  readonly endpoint: string;
  readonly filterFields: readonly string[];
  readonly sortFields: readonly string[];
  readonly recommendedIndexes: readonly string[];
}

const queryPatterns: readonly QueryPattern[] = [
  {
    endpoint: "GET /products?search=node&sort=price",
    filterFields: ["name", "sku"],
    sortFields: ["priceInCents"],
    recommendedIndexes: ["products.sku", "products.priceInCents"],
  },
  {
    endpoint: "GET /orders?userId=user_1&sort=createdAt",
    filterFields: ["userId"],
    sortFields: ["createdAt"],
    recommendedIndexes: ["orders.userId", "orders.createdAt"],
  },
];

for (const pattern of queryPatterns) {
  console.log(pattern.endpoint);
  console.log("Recommended indexes:", pattern.recommendedIndexes.join(", "));
}

console.log("Enterprise rule: add indexes for real query paths, then review write cost.");
