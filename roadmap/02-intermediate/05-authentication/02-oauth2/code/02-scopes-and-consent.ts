import { ClientRegistry } from "./module/registry/client-registry.js";
import { ScopeService } from "./module/services/scope-service.js";
import { oauthClients } from "./shared/oauth2-runtime.js";
import { logger } from "./shared/logger.js";

const client = new ClientRegistry(oauthClients).getRequired("web-dashboard");
const scopeService = new ScopeService();
const scopes = scopeService.validateRequestedScopes(client, ["profile:read", "orders:read"]);

logger.info("Scopes and consent", {
  client: client.name,
  grantedScopes: scopes,
  consentSummary: scopeService.describeConsent(scopes),
  guidance: "Enterprise OAuth2 design should keep scopes narrow and understandable so delegated access stays intentional instead of becoming a catch-all permission bucket.",
});
