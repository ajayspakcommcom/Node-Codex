import { SigningKeyStore } from "./module/keys/signing-key-store.js";
import { HmacJwtService } from "./module/services/hmac-jwt-service.js";
import { RevocationStore } from "./module/services/revocation-store.js";
import { TokenAuthenticator } from "./module/services/token-authenticator.js";
import { createBaseClaims, signingKeys, verificationContext } from "./shared/jwt-runtime.js";
import { logger } from "./shared/logger.js";

const keyStore = new SigningKeyStore(signingKeys);
const jwtService = new HmacJwtService(keyStore);
const authenticator = new TokenAuthenticator(jwtService, new RevocationStore());
const token = jwtService.issueAccessToken(
  createBaseClaims({
    aud: "wrong-audience",
  }),
);

try {
  authenticator.authenticate(token, verificationContext);
} catch (error: unknown) {
  logger.warn("Claims validation", {
    failure: error instanceof Error ? error.message : "Unknown verification error.",
    guidance: "Signature verification alone is not enough. Enterprise services should also enforce issuer, audience, and token timing constraints.",
  });
}
