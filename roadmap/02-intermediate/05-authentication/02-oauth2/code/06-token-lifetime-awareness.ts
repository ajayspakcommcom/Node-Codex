import { ClientRegistry } from "./module/registry/client-registry.js";
import { OAuth2AuthorizationServer } from "./module/services/oauth2-authorization-server.js";
import { AuthorizationCodeStore } from "./module/services/authorization-code-store.js";
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

const userDelegatedToken = authorizationServer.exchangeToken({
  clientId: "billing-worker",
  clientSecret: "billing-worker-secret",
  grantType: "client_credentials",
  requestedScopes: ["billing:read"],
  audience: "billing-api",
  nowEpochSeconds: verificationNowEpochSeconds,
});

logger.info("Token lifetime awareness", {
  tokenExpiresAt: userDelegatedToken.expiresAtEpochSeconds,
  lifetimeSeconds: userDelegatedToken.expiresAtEpochSeconds - verificationNowEpochSeconds,
  guidance: "Token lifetime should match the sensitivity and operational needs of the delegated access instead of defaulting to long-lived credentials.",
});
