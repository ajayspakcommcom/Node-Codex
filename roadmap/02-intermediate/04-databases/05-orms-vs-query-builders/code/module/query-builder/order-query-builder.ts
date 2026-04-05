import type { OrderRow } from "../../shared/data-access-types.js";

export class OrderQueryBuilder {
  private readonly whereClauses: string[] = [];
  private readonly joins: string[] = [];
  private readonly selectedFields: string[] = [];
  private orderByClause = "";
  private groupByClause = "";

  public select(...fields: readonly string[]): OrderQueryBuilder {
    this.selectedFields.push(...fields);
    return this;
  }

  public where(condition: string): OrderQueryBuilder {
    this.whereClauses.push(condition);
    return this;
  }

  public join(fragment: string): OrderQueryBuilder {
    this.joins.push(fragment);
    return this;
  }

  public groupBy(fragment: string): OrderQueryBuilder {
    this.groupByClause = fragment;
    return this;
  }

  public orderBy(fragment: string): OrderQueryBuilder {
    this.orderByClause = fragment;
    return this;
  }

  public toSQL(): string {
    const selectClause = this.selectedFields.length === 0 ? "*" : this.selectedFields.join(", ");
    const joinClause = this.joins.length === 0 ? "" : ` ${this.joins.join(" ")}`;
    const whereClause = this.whereClauses.length === 0 ? "" : ` WHERE ${this.whereClauses.join(" AND ")}`;
    const groupByClause = this.groupByClause === "" ? "" : ` GROUP BY ${this.groupByClause}`;
    const orderByClause = this.orderByClause === "" ? "" : ` ORDER BY ${this.orderByClause}`;

    return `SELECT ${selectClause} FROM orders${joinClause}${whereClause}${groupByClause}${orderByClause};`;
  }

  public execute(seedRows: readonly OrderRow[]): readonly OrderRow[] {
    return [...seedRows];
  }
}
