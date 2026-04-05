import type { IndexDefinition, TableStats } from "../../shared/indexing-types.js";

export class WriteCostAnalyzer {
  public estimateWriteCost(table: TableStats, indexes: readonly IndexDefinition[]): {
    readonly level: "low" | "moderate" | "high";
    readonly reason: string;
  } {
    const indexCount = indexes.length;

    if (table.writeVolume === "high" && indexCount >= 4) {
      return {
        level: "high",
        reason: "High-write tables with many indexes often pay noticeable maintenance cost on inserts and updates.",
      };
    }

    if (table.writeVolume === "medium" && indexCount >= 3) {
      return {
        level: "moderate",
        reason: "Write overhead is meaningful and should be justified by real read-path value.",
      };
    }

    return {
      level: "low",
      reason: "The current index count is unlikely to dominate write behavior for this table profile.",
    };
  }

  public findPotentialOverlap(indexes: readonly IndexDefinition[]): readonly string[] {
    const overlapWarnings: string[] = [];

    for (const candidate of indexes) {
      for (const other of indexes) {
        if (candidate.name === other.name) {
          continue;
        }

        const candidateColumns = candidate.columns.join(",");
        const otherColumns = other.columns.join(",");

        if (otherColumns.startsWith(candidateColumns)) {
          overlapWarnings.push(`${candidate.name} may overlap with ${other.name}`);
        }
      }
    }

    return [...new Set(overlapWarnings)];
  }
}
