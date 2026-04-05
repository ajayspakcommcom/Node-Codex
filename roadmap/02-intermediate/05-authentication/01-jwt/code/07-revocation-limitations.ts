import { SigningKeyStore } from "./module/keys/signing-key-store.js";
import { HmacJwtService } from "./module/services/hmac-jwt-service.js";
import { RevocationStore } from "./module/services/revocation-store.js";
import { TokenAuthenticator } from "./module/services/token-authenticator.js";
import { createBaseClaims, signingKeys, verificationContext } from "./shared/jwt-runtime.js";
import { logger } from "./shared/logger.js";

const revocationStore = new RevocationStore();
const authenticator = new TokenAuthenticator(new HmacJwtService(new SigningKeyStore(signingKeys)), revocationStore);
const jwtService = new HmacJwtService(new SigningKeyStore(signingKeys));
const token = jwtService.issueAccessToken(
  createBaseClaims({
    jti: "jti_revoked",
  }),
);

revocationStore.revokeToken("jti_revoked");

try {
  authenticator.authenticate(token, verificationContext);
} catch (error: unknown) {
  logger.warn("Revocation limitations", {
    failure: error instanceof Error ? error.message : "Unknown revocation error.",
    explanation:
      "Immediate revocation required a server-side denylist, which shows that purely stateless JWT handling often needs additional state once compromise response becomes important.",
    guidance: "Do not assume stateless JWTs are easy to revoke. Enterprise systems should plan for expiry windows, refresh strategy, and fallback stateful controls.",
  });
}
