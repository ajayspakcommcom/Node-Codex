import type { OAuth2Client } from "../../shared/oauth2-types.js";

export class ClientRegistry {
  private readonly clients = new Map<string, OAuth2Client>();

  public constructor(seedClients: readonly OAuth2Client[]) {
    for (const client of seedClients) {
      this.clients.set(client.clientId, { ...client });
    }
  }

  public getRequired(clientId: string): OAuth2Client {
    const client = this.clients.get(clientId);

    if (client === undefined) {
      throw new Error(`OAuth2 client ${clientId} was not found.`);
    }

    return client;
  }

  public authenticateClient(clientId: string, clientSecret: string): OAuth2Client {
    const client = this.getRequired(clientId);

    if (client.clientSecret !== clientSecret) {
      throw new Error("OAuth2 client authentication failed.");
    }

    return client;
  }
}
