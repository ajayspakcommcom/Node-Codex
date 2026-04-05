import { InMemoryMongoCollection } from "../engine/in-memory-mongo-collection.js";
import type { QueryParameters } from "../../shared/mongo-types.js";

export class OrderReadRepository {
  public constructor(private readonly collection: InMemoryMongoCollection) {}

  public listOrdersForGrid(tenantId: string, parameters: QueryParameters) {
    const page = parameters.page ?? 1;
    const pageSize = parameters.pageSize ?? 20;
    const sortBy = parameters.sortBy ?? "createdAt";
    const sortDirection = parameters.sortDirection === "asc" ? 1 : -1;

    return this.collection.find(
      {
        tenantId,
        ...(parameters.status === undefined ? {} : { status: parameters.status }),
        ...(parameters.channel === undefined ? {} : { channel: parameters.channel }),
        ...(parameters.region === undefined ? {} : { region: parameters.region }),
        ...(parameters.category === undefined ? {} : { category: parameters.category }),
        ...(parameters.minTotalInCents === undefined
          ? {}
          : { totalInCents: { $gte: parameters.minTotalInCents } }),
      },
      {
        projection: ["_id", "status", "channel", "region", "category", "totalInCents", "createdAt", "shipping.city"],
        sort: { [sortBy]: sortDirection },
        skip: (page - 1) * pageSize,
        limit: pageSize,
      },
    );
  }

  public listOrderIdsForRetryReview(tenantId: string) {
    return this.collection.find(
      {
        tenantId,
        "metrics.retryCount": { $gte: 1 },
      },
      {
        projection: ["_id", "metrics.retryCount", "status"],
        sort: { "metrics.retryCount": -1 },
        limit: 10,
      },
    );
  }
}
