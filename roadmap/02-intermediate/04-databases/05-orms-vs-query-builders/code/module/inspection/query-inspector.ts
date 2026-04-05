import type { QueryInspection } from "../../shared/data-access-types.js";

export class QueryInspector {
  public inspectOrmPreview(queryShape: string): QueryInspection {
    return {
      abstraction: "orm",
      queryShape,
      strengths: [
        "Model-centric workflow is easy to follow for CRUD behavior.",
        "Entity lifecycle and save semantics are simple for common use cases.",
      ],
      risks: [
        "Generated query still needs inspection for important paths.",
        "Projection and join shape may be less obvious to the team if they rely only on entities.",
      ],
    };
  }

  public inspectBuilderPreview(queryShape: string): QueryInspection {
    return {
      abstraction: "query-builder",
      queryShape,
      strengths: [
        "Query shape is explicit and easier to tune for reporting or specialized reads.",
        "Selected fields and joins are visible directly in the builder flow.",
      ],
      risks: [
        "Builder-heavy code can become verbose for simple CRUD operations.",
        "Without discipline, low-level query code can leak through repository boundaries.",
      ],
    };
  }
}
