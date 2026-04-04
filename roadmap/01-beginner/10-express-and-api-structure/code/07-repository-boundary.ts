class OrderRepository {
  async save(input: { readonly itemId: string; readonly quantity: number }) {
    return {
      id: "ord_repo_1",
      ...input,
      persisted: true,
    } as const;
  }
}

async function main(): Promise<void> {
  const repository = new OrderRepository();
  const saved = await repository.save({ itemId: "item_10", quantity: 4 });
  console.log("Repository boundary keeps persistence separate:", saved);
}

void main();
