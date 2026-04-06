export interface RfcAlternative {
  name: string;
  tradeoff: string;
}

export interface RfcDocument {
  title: string;
  problemStatement: string;
  nonGoals: readonly string[];
  alternatives: readonly RfcAlternative[];
  risks: readonly string[];
  migrationPlan: string;
  rollbackPlan: string;
  implementationLink: string | null;
}

export function createDefaultRfcDocument(): RfcDocument {
  return {
    title: "Adopt shared internal service bootstrap",
    problemStatement: "Service teams repeatedly rebuild the same startup and observability plumbing.",
    nonGoals: ["Replace all application frameworks immediately"],
    alternatives: [
      {
        name: "Shared template repository",
        tradeoff: "Lower operational coupling, but weaker upgrade enforcement.",
      },
      {
        name: "Framework package",
        tradeoff: "Higher consistency, but stronger platform ownership burden.",
      },
    ],
    risks: ["Migration may slow teams with custom startup logic."],
    migrationPlan: "Migrate new services first, then existing services during quarterly platform upgrades.",
    rollbackPlan: "Allow services to pin the previous bootstrap version during the rollback window.",
    implementationLink: "app://roadmap/04-expert/03-platform-engineering/01-internal-developer-platforms",
  };
}
