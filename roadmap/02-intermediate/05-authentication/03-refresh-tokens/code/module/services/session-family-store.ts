import type { SessionFamilyRecord } from "../../shared/refresh-types.js";

export class SessionFamilyStore {
  private readonly families = new Map<string, SessionFamilyRecord>();

  public ensureFamily(familyId: string, subject: string): SessionFamilyRecord {
    const existing = this.families.get(familyId);

    if (existing !== undefined) {
      return existing;
    }

    const family: SessionFamilyRecord = {
      familyId,
      subject,
      status: "active",
    };

    this.families.set(familyId, family);
    return family;
  }

  public revokeFamily(familyId: string, reason: string): SessionFamilyRecord {
    const family = this.getRequired(familyId);
    const updated: SessionFamilyRecord = {
      ...family,
      status: "revoked",
      revokedReason: reason,
    };

    this.families.set(familyId, updated);
    return updated;
  }

  public getRequired(familyId: string): SessionFamilyRecord {
    const family = this.families.get(familyId);

    if (family === undefined) {
      throw new Error(`Session family ${familyId} was not found.`);
    }

    return family;
  }

  public list(): readonly SessionFamilyRecord[] {
    return [...this.families.values()];
  }
}
