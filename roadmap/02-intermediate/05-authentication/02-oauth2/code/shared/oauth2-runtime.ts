import type { OAuth2Client } from "./oauth2-types.js";

export const verificationNowEpochSeconds = 1_775_338_800;

export const oauthClients: readonly OAuth2Client[] = [
  {
    clientId: "web-dashboard",
    clientSecret: "dashboard-secret",
    name: "Web Dashboard",
    type: "confidential",
    redirectUris: ["https://dashboard.acme.example/oauth/callback"],
    allowedScopes: ["profile:read", "orders:read", "orders:write"],
    allowedFlows: ["authorization_code"],
  },
  {
    clientId: "billing-worker",
    clientSecret: "billing-worker-secret",
    name: "Billing Worker",
    type: "machine",
    redirectUris: [],
    allowedScopes: ["billing:read", "billing:write"],
    allowedFlows: ["client_credentials"],
  },
];
