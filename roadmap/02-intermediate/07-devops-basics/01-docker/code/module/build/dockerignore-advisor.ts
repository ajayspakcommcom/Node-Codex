import type { DockerProjectSpec } from "../../shared/docker-types.js";

export class DockerignoreAdvisor {
  public missingImportantEntries(spec: DockerProjectSpec): readonly string[] {
    const recommendedEntries = ["node_modules", ".git", ".env", "coverage", "dist"];
    return recommendedEntries.filter((entry) => !spec.dockerignoreEntries.includes(entry));
  }
}
