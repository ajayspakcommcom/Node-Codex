import { ClientRegistry } from "./module/registry/client-registry.js";
import { AuthorizationCodeStore } from "./module/services/authorization-code-store.js";
import { OAuth2AuthorizationServer } from "./module/services/oauth2-authorization-server.js";
import { ScopeService } from "./module/services/scope-service.js";
import { TokenService } from "./module/services/token-service.js";
import { oauthClients, verificationNowEpochSeconds } from "./shared/oauth2-runtime.js";
import { logger } from "./shared/logger.js";

const authorizationServer = new OAuth2AuthorizationServer(
  new ClientRegistry(oauthClients),
  new ScopeService(),
  new AuthorizationCodeStore(),
  new TokenService(),
);

const authorization = authorizationServer.authorize({
  clientId: "web-dashboard",
  redirectUri: "https://dashboard.acme.example/oauth/callback",
  requestedScopes: ["profile:read", "orders:read"],
  userId: "user_42",
  nowEpochSeconds: verificationNowEpochSeconds,
});

logger.info("Core actors and delegated access", {
  actors: {
    resourceOwner: "user_42",
    client: "web-dashboard",
    authorizationServer: "oauth2-authorization-server",
    resourceServer: "orders-api",
  },
  authorization,
  guidance: "OAuth2 should be explained in terms of actors and delegated access before teams start talking about grant names or token exchange details.",
});
