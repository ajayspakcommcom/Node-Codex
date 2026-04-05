import type { AppConfig } from "../../shared/config-types.js";

export class ConfigLoader {
  public load(input: Partial<AppConfig>): AppConfig {
    return {
      environment: input.environment ?? "local",
      port: input.port ?? 3000,
      databaseUrl: input.databaseUrl ?? "",
      redisUrl: input.redisUrl,
      jwtSecret: input.jwtSecret,
      logLevel: input.logLevel ?? "info",
    };
  }
}
