import { TransactionContext } from "../db/in-memory-transaction-manager.js";
import type { InventoryItem } from "../../shared/transaction-types.js";

export class InventoryRepository {
  public findRequired(transaction: TransactionContext, sku: string): InventoryItem {
    const inventory = transaction.readInventory(sku);

    if (inventory === undefined) {
      throw new Error(`Inventory ${sku} was not found.`);
    }

    return inventory;
  }

  public reserve(transaction: TransactionContext, sku: string, units: number): InventoryItem {
    const inventory = this.findRequired(transaction, sku);

    if (inventory.availableUnits < units) {
      throw new Error(`Inventory ${sku} does not have ${units} units available.`);
    }

    const updatedInventory: InventoryItem = {
      ...inventory,
      availableUnits: inventory.availableUnits - units,
      reservedUnits: inventory.reservedUnits + units,
    };

    transaction.writeInventory(updatedInventory);
    return updatedInventory;
  }
}
