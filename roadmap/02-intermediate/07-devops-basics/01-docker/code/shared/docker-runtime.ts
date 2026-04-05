import type { DockerProjectSpec } from "./docker-types.js";

export const enterpriseApiSpec: DockerProjectSpec = {
  projectName: "billing-api",
  exposedPort: 3000,
  stages: [
    {
      name: "build",
      baseImage: "node:20-alpine",
      workdir: "/app",
      copyInstructions: ["package.json package-lock.json ./", "tsconfig.json ./", "src ./src"],
      runInstructions: ["npm ci", "npm run build"],
    },
    {
      name: "runtime",
      baseImage: "node:20-alpine",
      workdir: "/app",
      copyInstructions: ["package.json package-lock.json ./", "--from=build /app/dist ./dist"],
      runInstructions: ["npm ci --omit=dev"],
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      command: ["node", "dist/server.js"],
    },
  ],
  dockerignoreEntries: ["node_modules", "dist", ".git", ".env", "coverage", "*.log"],
  usesNonRootUser: true,
  injectsSecretsAtRuntime: true,
  buildInputsPinned: true,
};

export const riskyApiSpec: DockerProjectSpec = {
  projectName: "legacy-api",
  exposedPort: 3000,
  stages: [
    {
      baseImage: "node:latest",
      workdir: "/usr/src/app",
      copyInstructions: [". ."],
      runInstructions: ["npm install", "npm run build"],
      env: {
        NODE_ENV: "production",
        DB_PASSWORD: "hardcoded-secret",
      },
      command: ["npm", "start"],
    },
  ],
  dockerignoreEntries: [".git"],
  usesNonRootUser: false,
  injectsSecretsAtRuntime: false,
  buildInputsPinned: false,
};
