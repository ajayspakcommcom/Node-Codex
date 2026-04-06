export class InMemorySecretStore {
  constructor(private readonly secrets: Record<string, string>) {}

  get(path: string): string {
    const value = this.secrets[path];

    if (!value) {
      throw new Error(`Missing secret for path: ${path}`);
    }

    return value;
  }
}
