export interface LoadScenario {
  name: string;
  type: "ramp" | "soak";
  durationMinutes: number;
  targetConcurrency: number;
}

export class ScenarioCatalog {
  public constructor(private readonly scenarios: readonly LoadScenario[]) {}

  public list(): readonly LoadScenario[] {
    return this.scenarios;
  }
}

export function createScenarioCatalog(): ScenarioCatalog {
  return new ScenarioCatalog([
    {
      name: "release-ramp",
      type: "ramp",
      durationMinutes: 15,
      targetConcurrency: 800,
    },
    {
      name: "overnight-soak",
      type: "soak",
      durationMinutes: 360,
      targetConcurrency: 450,
    },
  ]);
}
