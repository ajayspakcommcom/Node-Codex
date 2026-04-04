interface ConnectionPoolConfig {
  readonly minConnections: number;
  readonly maxConnections: number;
  readonly idleTimeoutMs: number;
}

class DatabaseClient {
  public constructor(private readonly config: ConnectionPoolConfig) {}

  public connect(): void {
    console.log("Creating managed pool with config:", this.config);
  }

  public disconnect(): void {
    console.log("Closing pool gracefully.");
  }
}

const client = new DatabaseClient({
  minConnections: 2,
  maxConnections: 20,
  idleTimeoutMs: 30_000,
});

client.connect();
console.log("Enterprise rule: pool connections centrally, do not open a new connection per request.");
client.disconnect();
