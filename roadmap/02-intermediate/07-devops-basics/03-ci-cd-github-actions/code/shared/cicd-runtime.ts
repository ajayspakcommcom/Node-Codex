import type { WorkflowSpec } from "./cicd-types.js";

export const validationWorkflow: WorkflowSpec = {
  name: "validation",
  on: {
    pull_request: ["main"],
    push: ["main"],
  },
  jobs: [
    {
      id: "lint",
      runsOn: "ubuntu-latest",
      steps: [
        { name: "Checkout", uses: "actions/checkout@v4" },
        { name: "Setup Node", uses: "actions/setup-node@v4" },
        { name: "Install", run: "npm ci" },
        { name: "Lint", run: "npm run lint" },
      ],
    },
    {
      id: "test",
      runsOn: "ubuntu-latest",
      needs: ["lint"],
      steps: [
        { name: "Checkout", uses: "actions/checkout@v4" },
        { name: "Setup Node", uses: "actions/setup-node@v4" },
        { name: "Install", run: "npm ci" },
        { name: "Test", run: "npm test" },
      ],
    },
    {
      id: "build",
      runsOn: "ubuntu-latest",
      needs: ["test"],
      steps: [
        { name: "Checkout", uses: "actions/checkout@v4" },
        { name: "Setup Node", uses: "actions/setup-node@v4" },
        { name: "Install", run: "npm ci" },
        { name: "Build", run: "npm run build" },
      ],
    },
  ],
  producesArtifacts: true,
};

export const deploymentWorkflow: WorkflowSpec = {
  name: "deploy-production",
  on: {
    push: ["main"],
  },
  jobs: [
    {
      id: "validate",
      runsOn: "ubuntu-latest",
      steps: [
        { name: "Checkout", uses: "actions/checkout@v4" },
        { name: "Install", run: "npm ci" },
        { name: "Test", run: "npm test" },
        { name: "Build", run: "npm run build" },
      ],
    },
    {
      id: "deploy",
      runsOn: "ubuntu-latest",
      needs: ["validate"],
      environment: "production",
      steps: [
        { name: "Download Artifact", uses: "actions/download-artifact@v4" },
        { name: "Deploy", run: "./scripts/deploy.sh" },
      ],
    },
  ],
  requiredSecrets: ["PRODUCTION_DEPLOY_KEY"],
  producesArtifacts: true,
};

export const riskyWorkflow: WorkflowSpec = {
  name: "all-in-one",
  on: {
    push: ["*"],
  },
  jobs: [
    {
      id: "everything",
      runsOn: "ubuntu-latest",
      steps: [
        { name: "Checkout", uses: "actions/checkout@v4" },
        { name: "Install", run: "npm install" },
        { name: "Deploy", run: "echo $PROD_TOKEN && ./deploy.sh" },
      ],
    },
  ],
  requiredSecrets: ["PROD_TOKEN"],
  producesArtifacts: false,
};
