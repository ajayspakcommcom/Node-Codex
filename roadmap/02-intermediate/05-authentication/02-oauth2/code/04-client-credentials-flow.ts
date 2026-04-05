import { ClientRegistry } from "./module/registry/client-registry.js";
import { OAuth2AuthorizationServer } from "./module/services/oauth2-authorization-server.js";
import { AuthorizationCodeStore } from "./module/services/authorization-code-store.js";
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

const accessToken = authorizationServer.exchangeToken({
  clientId: "billing-worker",
  clientSecret: "billing-worker-secret",
  grantType: "client_credentials",
  requestedScopes: ["billing:read"],
  audience: "billing-api",
  nowEpochSeconds: verificationNowEpochSeconds,
});

logger.info("Client credentials flow", {
  accessToken,
  resourceAccessAllowed: resourceServer.authorizeRequest(accessToken, {
    expectedAudience: "billing-api",
    requiredScopes: ["billing:read"],
    nowEpochSeconds: verificationNowEpochSeconds,
  }),
  guidance: "Client credentials fits machine-to-machine access because no human resource owner is delegating access in this flow.",
});
