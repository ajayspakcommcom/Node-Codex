import type { SigningKey } from "../../shared/jwt-types.js";

export class SigningKeyStore {
  private readonly keys = new Map<string, SigningKey>();
  private activeKid: string;

  public constructor(seedKeys: readonly SigningKey[]) {
    for (const key of seedKeys) {
      this.keys.set(key.kid, { ...key });
    }

    const activeKey = seedKeys.find((key) => key.status === "active");

    if (activeKey === undefined) {
      throw new Error("At least one active signing key is required.");
    }

    this.activeKid = activeKey.kid;
  }

  public getActiveKey(): SigningKey {
    return this.getRequired(this.activeKid);
  }

  public getVerificationKey(kid: string): SigningKey {
    return this.getRequired(kid);
  }

  public rotateTo(newKey: SigningKey): void {
    const currentActiveKey = this.getActiveKey();
    this.keys.set(currentActiveKey.kid, {
      ...currentActiveKey,
      status: "verifying-only",
    });
    this.keys.set(newKey.kid, {
      ...newKey,
      status: "active",
    });
    this.activeKid = newKey.kid;
  }

  public retire(kid: string): void {
    this.keys.delete(kid);
  }

  public list(): readonly SigningKey[] {
    return [...this.keys.values()];
  }

  private getRequired(kid: string): SigningKey {
    const key = this.keys.get(kid);

    if (key === undefined) {
      throw new Error(`Signing key ${kid} was not found.`);
    }

    return key;
  }
}
