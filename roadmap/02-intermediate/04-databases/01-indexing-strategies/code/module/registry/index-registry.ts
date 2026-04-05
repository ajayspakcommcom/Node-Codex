import type { IndexDefinition } from "../../shared/indexing-types.js";

export class IndexRegistry {
  public constructor(private readonly indexes: readonly IndexDefinition[]) {}

  public listForTable(tableName: string): readonly IndexDefinition[] {
    return this.indexes.filter((index) => index.tableName === tableName);
  }

  public findSupportingIndex(tableName: string, columns: readonly string[]): IndexDefinition | undefined {
    return this.indexes.find((index) => {
      if (index.tableName !== tableName) {
        return false;
      }

      return columns.every((column, indexPosition) => index.columns[indexPosition] === column);
    });
  }
}
