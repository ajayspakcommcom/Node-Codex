import type { ComposeSpec } from "./compose-types.js";

export const appDatabaseSpec: ComposeSpec = {
  projectName: "billing-local",
  services: [
    {
      name: "api",
      buildContext: ".",
      command: ["npm", "run", "dev"],
      ports: ["3000:3000"],
      environment: {
        PORT: "3000",
        MONGO_URL: "mongodb://mongo:27017/billing",
      },
      dependsOn: ["mongo"],
      networks: ["billing-network"],
      readinessSignal: "healthcheck",
    },
    {
      name: "mongo",
      image: "mongo:7",
      ports: ["27017:27017"],
      volumes: ["mongo-data:/data/db"],
      networks: ["billing-network"],
      readinessSignal: "healthcheck",
    },
  ],
  namedVolumes: ["mongo-data"],
  networks: ["billing-network"],
};

export const appRedisWorkerSpec: ComposeSpec = {
  projectName: "billing-worker-local",
  services: [
    {
      name: "api",
      buildContext: ".",
      command: ["npm", "run", "dev"],
      ports: ["3000:3000"],
      environment: {
        PORT: "3000",
        REDIS_URL: "redis://redis:6379",
      },
      dependsOn: ["redis"],
      networks: ["billing-network"],
      readinessSignal: "healthcheck",
    },
    {
      name: "worker",
      buildContext: ".",
      command: ["npm", "run", "worker"],
      environment: {
        REDIS_URL: "redis://redis:6379",
      },
      dependsOn: ["redis"],
      networks: ["billing-network"],
      readinessSignal: "startup_only",
    },
    {
      name: "redis",
      image: "redis:7-alpine",
      ports: ["6379:6379"],
      volumes: ["redis-data:/data"],
      networks: ["billing-network"],
      readinessSignal: "healthcheck",
    },
  ],
  namedVolumes: ["redis-data"],
  networks: ["billing-network"],
};

export const riskyComposeSpec: ComposeSpec = {
  projectName: "messy-local",
  services: [
    {
      name: "api",
      buildContext: ".",
      command: ["npm", "start"],
      ports: ["3000:3000"],
      environment: {
        MONGO_URL: "mongodb://localhost:27017/local",
        REDIS_URL: "redis://localhost:6379",
        JWT_SECRET: "hardcoded-secret",
      },
      dependsOn: ["mongo", "redis"],
      readinessSignal: "startup_only",
    },
    {
      name: "mongo",
      image: "mongo:latest",
      ports: ["27017:27017"],
      readinessSignal: "none",
    },
    {
      name: "redis",
      image: "redis:latest",
      ports: ["6379:6379"],
      readinessSignal: "none",
    },
  ],
};
