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

try {
  authorizationServer.authorize({
    clientId: "web-dashboard",
    redirectUri: "https://evil.example/callback",
    requestedScopes: ["orders:read"],
    userId: "user_42",
    nowEpochSeconds: verificationNowEpochSeconds,
  });
} catch (error: unknown) {
  logger.warn("Redirect URI safety", {
    failure: error instanceof Error ? error.message : "Unknown redirect validation error.",
    guidance: "Redirect handling is part of the security boundary. Enterprise OAuth2 implementations should allow only explicit, pre-registered callback URIs.",
  });
}
