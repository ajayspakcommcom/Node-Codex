export interface ApprovedException {
  serviceName: string;
  controlId: string;
  approvedBy: string;
  rationale: string;
  expiresOn: string;
}

export class ExceptionRegistry {
  public constructor(private readonly approvals: readonly ApprovedException[]) {}

  public findActiveApproval(input: { serviceName: string; controlId: string }): ApprovedException | null {
    return (
      this.approvals.find(
        (approval) =>
          approval.serviceName === input.serviceName && approval.controlId === input.controlId,
      ) ?? null
    );
  }
}

export function createDefaultExceptionRegistry(): ExceptionRegistry {
  return new ExceptionRegistry([
    {
      serviceName: "reporting-worker",
      controlId: "default-tracing",
      approvedBy: "platform-architecture",
      rationale: "Third-party batch runtime cannot propagate platform tracer yet.",
      expiresOn: "2026-12-31",
    },
  ]);
}
