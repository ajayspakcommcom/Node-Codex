import { ClientRegistry } from "./module/registry/client-registry.js";
import { AuthorizationCodeStore } from "./module/services/authorization-code-store.js";
import { OAuth2AuthorizationServer } from "./module/services/oauth2-authorization-server.js";
import { ResourceServer } from "./module/services/resource-server.js";
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
const resourceServer = new ResourceServer();

const authorization = authorizationServer.authorize({
  clientId: "web-dashboard",
  redirectUri: "https://dashboard.acme.example/oauth/callback",
  requestedScopes: ["orders:read"],
  userId: "user_42",
  nowEpochSeconds: verificationNowEpochSeconds,
});
const accessToken = authorizationServer.exchangeToken({
  clientId: "web-dashboard",
  clientSecret: "dashboard-secret",
  grantType: "authorization_code",
  code: authorization.code,
  redirectUri: "https://dashboard.acme.example/oauth/callback",
  audience: "orders-api",
  nowEpochSeconds: verificationNowEpochSeconds,
});

logger.info("Authorization code flow", {
  authorizationCode: authorization.code,
  accessToken,
  resourceAccessAllowed: resourceServer.authorizeRequest(accessToken, {
    expectedAudience: "orders-api",
    requiredScopes: ["orders:read"],
    nowEpochSeconds: verificationNowEpochSeconds,
  }),
  guidance: "The authorization code pattern keeps delegated user access explicit and exchanges the code for a resource-scoped token at the trusted backend boundary.",
});
