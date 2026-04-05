import { SigningKeyStore } from "./module/keys/signing-key-store.js";
import { AuthorizationService } from "./module/services/authorization-service.js";
import { HmacJwtService } from "./module/services/hmac-jwt-service.js";
import { RevocationStore } from "./module/services/revocation-store.js";
import { TokenAuthenticator } from "./module/services/token-authenticator.js";
import { createBaseClaims, signingKeys, verificationContext } from "./shared/jwt-runtime.js";
import { logger } from "./shared/logger.js";

const keyStore = new SigningKeyStore(signingKeys);
const jwtService = new HmacJwtService(keyStore);
const authenticator = new TokenAuthenticator(jwtService, new RevocationStore());
const authorizationService = new AuthorizationService();

const token = jwtService.issueAccessToken(
  createBaseClaims({
    roles: ["member"],
    scopes: ["orders:read"],
  }),
);
const verified = authenticator.authenticate(token, verificationContext);

logger.info("Authentication vs authorization boundary", {
  authenticatedSubject: verified.claims.sub,
  canReadOrders: authorizationService.hasAccess(verified, {
    anyScope: ["orders:read"],
  }),
  canRefundOrders: authorizationService.hasAccess(verified, {
    anyRole: ["admin"],
    anyScope: ["orders:refund"],
  }),
  guidance: "JWT verification authenticates the caller. Separate authorization logic still decides what that caller is allowed to do.",
});
