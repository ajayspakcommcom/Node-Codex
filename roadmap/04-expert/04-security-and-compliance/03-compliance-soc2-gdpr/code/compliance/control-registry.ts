export interface ComplianceControl {
  controlId: string;
  owner: string;
  framework: "soc2" | "gdpr";
}

export class ControlRegistry {
  public constructor(private readonly controls: readonly ComplianceControl[]) {}

  public find(controlId: string): ComplianceControl {
    const control = this.controls.find((candidate) => candidate.controlId === controlId);

    if (!control) {
      throw new Error(`No compliance control registered for ${controlId}`);
    }

    return control;
  }
}

export function createDefaultControlRegistry(): ControlRegistry {
  return new ControlRegistry([
    {
      controlId: "soc2-access-review",
      owner: "platform-security",
      framework: "soc2",
    },
    {
      controlId: "gdpr-deletion-request",
      owner: "privacy-engineering",
      framework: "gdpr",
    },
  ]);
}
