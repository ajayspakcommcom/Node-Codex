export interface AppConfig {
  readonly nodeEnv: string;
  readonly port: number;
  readonly logLevel: string;
  readonly serviceName: string;
}

function readRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function loadConfig(): AppConfig {
  return {
    nodeEnv: readRequiredEnv("NODE_ENV"),
    port: Number(readRequiredEnv("PORT")),
    logLevel: readRequiredEnv("LOG_LEVEL"),
    serviceName: readRequiredEnv("SERVICE_NAME"),
  };
}
