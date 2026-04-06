export interface DrainSnapshot {
  draining: boolean;
  inflightCount: number;
  acceptedRequestIds: readonly string[];
  safeToExit: boolean;
}

export class ConnectionDrainController {
  private draining = false;
  private readonly inflightRequestIds = new Set<string>();

  acceptRequest(requestId: string): boolean {
    if (this.draining) {
      return false;
    }

    this.inflightRequestIds.add(requestId);
    return true;
  }

  finishRequest(requestId: string): void {
    this.inflightRequestIds.delete(requestId);
  }

  beginDrain(): void {
    this.draining = true;
  }

  snapshot(): DrainSnapshot {
    return {
      draining: this.draining,
      inflightCount: this.inflightRequestIds.size,
      acceptedRequestIds: [...this.inflightRequestIds],
      safeToExit: this.draining && this.inflightRequestIds.size === 0,
    };
  }
}
