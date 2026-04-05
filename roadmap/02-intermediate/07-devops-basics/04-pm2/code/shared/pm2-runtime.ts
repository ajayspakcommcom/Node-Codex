import type { Pm2EcosystemSpec } from "./pm2-types.js";

export const productionApiSpec: Pm2EcosystemSpec = {
  apps: [
    {
      name: "billing-api",
      script: "dist/server.js",
      instances: "max",
      execMode: "cluster",
      watch: false,
      autorestart: true,
      maxRestarts: 5,
      env: {
        NODE_ENV: "development",
        PORT: "3000",
      },
      envProduction: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      errorFile: "./logs/billing-api.err.log",
      outFile: "./logs/billing-api.out.log",
    },
  ],
};

export const riskyPm2Spec: Pm2EcosystemSpec = {
  apps: [
    {
      name: "legacy-api",
      script: "server.js",
      instances: 4,
      execMode: "cluster",
      watch: true,
      autorestart: true,
      maxRestarts: 100,
      env: {
        NODE_ENV: "production",
        SESSION_SECRET: "hardcoded-secret",
      },
    },
  ],
};
