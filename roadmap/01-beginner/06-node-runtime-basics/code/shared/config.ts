export interface AppConfig {
  readonly serviceName: string;
  readonly port: number;
  readonly environment: string;
}

export function loadAppConfigFromEnv(env: NodeJS.ProcessEnv): AppConfig {
  const serviceName = env.SERVICE_NAME ?? "runtime-example-service";
  const environment = env.NODE_ENV ?? "development";
  const portRaw = env.PORT ?? "3000";
  const port = Number(portRaw);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`Invalid PORT value: ${portRaw}`);
  }

  return {
    serviceName,
    port,
    environment,
  };
}
