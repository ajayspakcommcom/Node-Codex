import type {
  FilterDefinition,
  FindOptions,
  MongoOrder,
  QueryExecutionSummary,
  UpdateOperators,
} from "../../shared/mongo-types.js";

function getByPath(document: Record<string, unknown>, path: string): unknown {
  const segments = path.split(".");
  let current: unknown = document;

  for (const segment of segments) {
    if (typeof current !== "object" || current === null || !(segment in current)) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return current;
}

function setByPath(document: Record<string, unknown>, path: string, value: unknown): void {
  const segments = path.split(".");
  let current: Record<string, unknown> = document;

  for (const segment of segments.slice(0, -1)) {
    const next = current[segment];

    if (typeof next !== "object" || next === null || Array.isArray(next)) {
      current[segment] = {};
    }

    current = current[segment] as Record<string, unknown>;
  }

  current[segments[segments.length - 1] as string] = value;
}

export class InMemoryMongoCollection {
  private documents: MongoOrder[];

  public constructor(seedDocuments: readonly MongoOrder[]) {
    this.documents = seedDocuments.map((document) => JSON.parse(JSON.stringify(document)) as MongoOrder);
  }

  public find(filter: FilterDefinition, options: FindOptions = {}): {
    readonly documents: readonly Record<string, unknown>[];
    readonly summary: QueryExecutionSummary;
  } {
    const matched = this.documents.filter((document) => this.matches(document, filter));
    const sorted = this.applySort(matched, options.sort);
    const skipped = sorted.slice(options.skip ?? 0);
    const limited = skipped.slice(0, options.limit ?? skipped.length);
    const projected = this.applyProjection(limited, options.projection);

    return {
      documents: projected,
      summary: {
        matchedCount: matched.length,
        returnedCount: projected.length,
        projectedFieldCount: options.projection?.length ?? Object.keys(projected[0] ?? {}).length,
        usedSkip: options.skip ?? 0,
        note:
          options.projection === undefined
            ? "Returned full documents."
            : "Returned a narrowed projection for the consumer.",
      },
    };
  }

  public updateOne(filter: FilterDefinition, updates: UpdateOperators): MongoOrder {
    const targetIndex = this.documents.findIndex((document) => this.matches(document, filter));

    if (targetIndex === -1) {
      throw new Error("No matching document found for update.");
    }

    const updated = JSON.parse(JSON.stringify(this.documents[targetIndex])) as Record<string, unknown>;

    for (const [path, value] of Object.entries(updates.$set ?? {})) {
      setByPath(updated, path, value);
    }

    for (const [path, increment] of Object.entries(updates.$inc ?? {})) {
      const currentValue = getByPath(updated, path);
      setByPath(updated, path, Number(currentValue ?? 0) + increment);
    }

    for (const [path, pushedValue] of Object.entries(updates.$push ?? {})) {
      const currentValue = getByPath(updated, path);
      const arrayValue = Array.isArray(currentValue) ? [...currentValue, pushedValue] : [pushedValue];
      setByPath(updated, path, arrayValue);
    }

    this.documents[targetIndex] = updated as MongoOrder;
    return JSON.parse(JSON.stringify(this.documents[targetIndex])) as MongoOrder;
  }

  public snapshot(): readonly MongoOrder[] {
    return this.documents.map((document) => JSON.parse(JSON.stringify(document)) as MongoOrder);
  }

  private matches(document: MongoOrder, filter: FilterDefinition): boolean {
    return Object.entries(filter).every(([path, expected]) => {
      const actual = getByPath(document as unknown as Record<string, unknown>, path);

      if (typeof expected === "object" && expected !== null && !Array.isArray(expected)) {
        const operatorObject = expected as Record<string, unknown>;

        if ("$gte" in operatorObject) {
          return Number(actual) >= Number(operatorObject.$gte);
        }

        if ("$in" in operatorObject) {
          return Array.isArray(operatorObject.$in) && operatorObject.$in.includes(actual);
        }
      }

      return actual === expected;
    });
  }

  private applySort(
    documents: readonly MongoOrder[],
    sortDefinition: Readonly<Record<string, 1 | -1>> | undefined,
  ): readonly MongoOrder[] {
    if (sortDefinition === undefined) {
      return documents;
    }

    const [[sortKey, direction]] = Object.entries(sortDefinition);

    if (sortKey === undefined || direction === undefined) {
      return documents;
    }

    return [...documents].sort((left, right) => {
      const leftValue = getByPath(left as unknown as Record<string, unknown>, sortKey);
      const rightValue = getByPath(right as unknown as Record<string, unknown>, sortKey);

      if (leftValue === rightValue) {
        return 0;
      }

      if (leftValue === undefined) {
        return 1;
      }

      if (rightValue === undefined) {
        return -1;
      }

      return leftValue > rightValue ? direction : -direction;
    });
  }

  private applyProjection(
    documents: readonly MongoOrder[],
    projection: readonly string[] | undefined,
  ): readonly Record<string, unknown>[] {
    if (projection === undefined) {
      return documents.map((document) => JSON.parse(JSON.stringify(document)) as Record<string, unknown>);
    }

    return documents.map((document) => {
      const projected: Record<string, unknown> = {};

      for (const path of projection) {
        setByPath(projected, path, getByPath(document as unknown as Record<string, unknown>, path));
      }

      return projected;
    });
  }
}
