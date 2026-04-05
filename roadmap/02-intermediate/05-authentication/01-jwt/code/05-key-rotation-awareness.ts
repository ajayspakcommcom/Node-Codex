import { SigningKeyStore } from "./module/keys/signing-key-store.js";
import { HmacJwtService } from "./module/services/hmac-jwt-service.js";
import { RevocationStore } from "./module/services/revocation-store.js";
import { TokenAuthenticator } from "./module/services/token-authenticator.js";
import { createBaseClaims, signingKeys, verificationContext } from "./shared/jwt-runtime.js";
import { logger } from "./shared/logger.js";

const keyStore = new SigningKeyStore(signingKeys);
const jwtService = new HmacJwtService(keyStore);
const authenticator = new TokenAuthenticator(jwtService, new RevocationStore());

const legacyToken = jwtService.issueAccessToken(createBaseClaims());

keyStore.rotateTo({
  kid: "2026-05-primary",
  secret: "jwt-next-signing-secret-enterprise-demo",
  status: "active",
});

const newToken = jwtService.issueAccessToken(
  createBaseClaims({
    jti: "jti_rotated",
  }),
);

const legacyVerified = authenticator.authenticate(legacyToken, verificationContext);
const newVerified = authenticator.authenticate(newToken, verificationContext);
keyStore.retire("2026-04-primary");

let retiredKeyFailure = "";

try {
  authenticator.authenticate(legacyToken, verificationContext);
} catch (error: unknown) {
  retiredKeyFailure = error instanceof Error ? error.message : "Unknown retirement error.";
}

logger.info("Key rotation awareness", {
  keysAfterRotation: keyStore.list(),
  legacyVerifiedKid: legacyVerified.header.kid,
  newVerifiedKid: newVerified.header.kid,
  retiredKeyFailure,
  guidance: "Key rotation should allow old tokens to verify during a transition window, then retire old keys cleanly once the rollover period ends.",
});
