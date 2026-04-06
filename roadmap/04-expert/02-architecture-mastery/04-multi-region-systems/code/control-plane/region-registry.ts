export interface RegionState {
  readonly region: string;
  readonly healthy: boolean;
}

export class RegionRegistry {
  private readonly states = new Map<string, RegionState>();

  constructor(initialStates: readonly RegionState[]) {
    for (const state of initialStates) {
      this.states.set(state.region, state);
    }
  }

  isHealthy(region: string): boolean {
    return this.states.get(region)?.healthy ?? false;
  }

  setHealth(region: string, healthy: boolean): void {
    this.states.set(region, { region, healthy });
  }
}
