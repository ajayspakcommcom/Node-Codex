export class RolloutPlanner {
  public stepsFor(serviceName: string): readonly string[] {
    return [
      `baseline policy for ${serviceName}`,
      `10 percent candidate traffic for ${serviceName}`,
      `50 percent candidate traffic for ${serviceName}`,
      `100 percent candidate traffic for ${serviceName}`,
    ] as const;
  }
}

export function createRolloutPlanner(): RolloutPlanner {
  return new RolloutPlanner();
}
