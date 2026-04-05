import { SigningKeyStore } from "./module/keys/signing-key-store.js";
import { HmacJwtService } from "./module/services/hmac-jwt-service.js";
import { RevocationStore } from "./module/services/revocation-store.js";
import { TokenAuthenticator } from "./module/services/token-authenticator.js";
import { createBaseClaims, signingKeys, verificationContext } from "./shared/jwt-runtime.js";
import { logger } from "./shared/logger.js";

const keyStore = new SigningKeyStore(signingKeys);
const jwtService = new HmacJwtService(keyStore);
const authenticator = new TokenAuthenticator(jwtService, new RevocationStore());

const shortLivedToken = jwtService.issueAccessToken(
  createBaseClaims({
    exp: verificationContext.nowEpochSeconds + 300,
  }),
);
const expiredToken = jwtService.issueAccessToken(
  createBaseClaims({
    jti: "jti_expired",
    exp: verificationContext.nowEpochSeconds - 30,
  }),
);

const shortLivedVerification = authenticator.authenticate(shortLivedToken, verificationContext);

try {
  authenticator.authenticate(expiredToken, verificationContext);
} catch (error: unknown) {
  logger.info("Expiry and short-lived access tokens", {
    shortLivedTokenExp: shortLivedVerification.claims.exp,
    expiredTokenFailure: error instanceof Error ? error.message : "Unknown expiry validation error.",
    guidance: "Enterprise JWT strategies keep access tokens short-lived so compromise windows stay smaller and refresh logic handles longer session continuity.",
  });
}
