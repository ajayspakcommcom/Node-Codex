import type { AppConfig } from "./config-types.js";

export const localConfig: AppConfig = {
  environment: "local",
  port: 3000,
  databaseUrl: "mongodb://localhost:27017/billing_local",
  redisUrl: "redis://localhost:6379",
  jwtSecret: "local-dev-secret",
  logLevel: "debug",
};

export const stagingConfig: AppConfig = {
  environment: "staging",
  port: 3000,
  databaseUrl: "mongodb://staging-db.internal:27017/billing_staging",
  redisUrl: "redis://staging-redis.internal:6379",
  jwtSecret: "staging-managed-secret",
  logLevel: "info",
};

export const productionConfig: AppConfig = {
  environment: "production",
  port: 3000,
  databaseUrl: "mongodb://prod-db.internal:27017/billing_prod",
  redisUrl: "redis://prod-redis.internal:6379",
  jwtSecret: "prod-managed-secret",
  logLevel: "warn",
};

export const riskyConfig: Partial<AppConfig> = {
  environment: "production",
  port: 3000,
  databaseUrl: "",
  logLevel: "debug",
};
